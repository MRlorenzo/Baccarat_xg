import Mousetrap from 'mousetrap';
const NAME = {
	Seven: '7',
	Eight: '8',
	NINE: '9',
	Slash: '/',
	Star: '*'
};
const init = Symbol(), exec = Symbol(), runAction = Symbol();
class KeyCodeHandler {
	constructor( target = document){
		this.context = new Mousetrap(target);
		this.fnKeys = [];
		// 按下功能键
		this.hooks = {};
		// 按下1,2,3
		this.actions = {};
		this.active = true;
		this[init]();
	}

	[init](){
		const c = this.context;
		c.bind('1', ()=>{
			this[runAction]('1');
		});
		c.bind('2', ()=>{
			this[runAction]('2');
		});
		c.bind('3', ()=>{
			this[runAction]('3');
		});

		c.bind('7', ()=>{
			if(this.active){
				this.fnKeys.push('7');
			}
		});
		c.bind('8',()=>{
			if(this.active){
				this.fnKeys.push('8');
			}
		});
		c.bind('9', ()=>{
			if(this.active){
				this.fnKeys.push('9');
			}
		});

		c.bind('/', ()=>{
			if(this.active){
				this.fnKeys.push('/');
			}
		});

		c.bind('*', ()=>{
			if(this.active){
				this.fnKeys.push('*');
			}
		});

		c.bind('enter', ()=> {
			if (this.active){
				let [a, b] = this.fnKeys.splice(-2 , 2);
				if (a == null){ // 一个命令都没有
					return ;
				}
				// 单
				const single = a !== b;
				this[exec](b || a, single);
			}
			this.fnKeys = [];
		})
	}

	[exec]( name, single){
		let fnName = single ? name : `${name} ${name}`;
		const fn = this.hooks[fnName];
		if (typeof fn === 'function'){
			fn();
		}
	}

	[runAction]( name ){
		if (this.active){
			const fn = this.actions[name];
			if(typeof fn === 'function'){
				fn();
			}
		}
	}

	start(){
		this.active = true;
	}

	stop(){
		this.active = false;
	}

	keyIn(name , fn){
		this.actions[name] = fn;
	}

	addHooks(name , fn){
		this.hooks[name] = fn;
	}

}
export default {
	install(Vue , options){

		Vue.prototype.$fnKeyMap = new KeyCodeHandler();

	}
}