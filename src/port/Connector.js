/*连接器*/
const handleDisconnect = Symbol(), watchEvent = Symbol(),handleData = Symbol();
export default class Connector {

	constructor( provider ){
		if (provider == null){
			throw new Error('找不到资源');
		}
		// 数据处理
		this[handleData] = ()=>{};
		provider.whenCompleteData(this[handleData]);

		this.provider = provider;

		// 当端口断开连接时，是否是意外的情况发生
		this.isAccident = true;
		// 断线处理
		this[handleDisconnect] = ()=> {};
		this[watchEvent]();
	}

	async [watchEvent](){
		const port = await this.provider.getPort()
		/*
        * 拔掉usb不会触发.
        * */
		port.on('disconnect' , function () {
			this[handleDisconnect]();
		});

		/*
        * 不管如何,只要是port.isOpen发生变化都会触发.拔掉usb会触发.
        * */
		let timer = setInterval(()=>{
			//串口发生了中断或者其他未知情况导致此时是非打开状态
			if(port.isOpen === false){
				this[handleDisconnect]();
				clearInterval(timer);
			}
		} , 1000 );

		/*
        * 拔掉usb不会触发.
        * */
		port.on('error', err=> {
			this[handleDisconnect]();
			clearInterval(timer);
		});

	}

	// 获得数据时
	whenData( handler ){
		if (typeof handler === 'function'){
			this[handleData] = handler;
		}
	}

	// 断线时
	whenDisconnect( handler ){
		if (typeof handler === 'function'){
			this[handleDisconnect] = ()=>{
				if (this.isAccident){
					// 如果是意外情况
					handler();
				}
			}
		}
	}

	// 打开连接
	async open(){
		const port = await this.provider.getPort();
		return new Promise((resolve, reject) => {
			if (port.isOpen === true){
				resolve();
				return ;
			}
			port.open( err=> {
				if (err){
					reject(err);
				}else{
					this.isAccident = true;
					resolve();
				}
			})
		})
	}

	// 关闭连接
	async close(){
		this.isAccident = false;
        const port = await this.provider.getPort();
		return new Promise((resolve, reject) => {
			if (port.isOpen === false){
				resolve();
				return;
			}
			port.close(err=>{
				if (err){
					reject(err);
				}else{
					resolve();
				}
			})
		})
	}

	// 重启
	async reOpen(){
        const port = await this.provider.getPort();
        if (port.isOpen === false){
        	return this.open();
		}else{
        	await this.close();
        	return this.open();
		}
	}

	// 更新资源
	async update( provider ){
		// 关闭资源
		await this.close();
		let oldPort = await this.provider.getPort();
		oldPort = null;
		this.provider = provider;
		return this.open();
	}
}