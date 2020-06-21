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

		// 端口
		this.port = provider.getPort();
		// 当端口断开连接时，是否是意外的情况发生
		this.isAccident = true;
		// 断线处理
		this[handleDisconnect] = ()=> {};
		this[watchEvent](this.port);
	}

	[watchEvent]( port ){
		/*
        * 拔掉usb不会触发.
        * */
		this.port.on('disconnect' , function () {
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
	open(){
		return new Promise((resolve, reject) => {
			this.port.open( err=> {
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
	close(){
		this.isAccident = false;
		return new Promise((resolve, reject) => {
			this.port.close(err=>{
				if (err){
					reject(err);
				}else{
					resolve();
				}
			})
		})
	}

	// 重启
	reOpen(){
		return new Promise((resolve, reject) => {
			if (this.port.isOpen === false){
				this.open().then(resolve).catch(reject);
			}else{
				this.close().then(()=>{

					this.open().then(resolve).catch(reject);

				}).catch(reject);
			}
		})
	}

}