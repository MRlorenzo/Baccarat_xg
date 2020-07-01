export function clone(...target) {
    return Object.assign({}, ...target);
}

function firstLocaleUpperCase(string){
	const firstCase = string.substring(0,1).toLocaleUpperCase();
	const fix = string.substring(1,string.length);
	return firstCase + fix;
}
// 将对象转化为bean(拥有getter,setter)
export function bean( obj ){
	const fields = new Set();
	Object.keys(obj).forEach(k=>{
		if (typeof obj[k] !== 'function'){
			fields.add(k);
		}
	})
	const map = {};
	for (const key of fields){
		const getter = function(){
			return this[key];
		}
		const setter = function(value){
			this[key] = value;
		}
		map['get'+firstLocaleUpperCase(key)] = getter;
		map['set'+firstLocaleUpperCase(key)] = setter;
	}
	return clone(obj , map);
}
// 数据实体(只读)
export function dataBean( obj ) {
	const fields = new Set();
	Object.keys(obj).forEach(k=>{
		if (typeof obj[k] !== 'function'){
			fields.add(k);
		}
	});
	const map = {};
	for (const key of fields){
		const getter = function(){
			return this[key];
		}
		map['get'+firstLocaleUpperCase(key)] = getter;
	}
	return Object.freeze(clone(obj , map));
}

// 创建枚举对象
export function enums( obj ) {
	const fields = new Set();
	Object.keys(obj).forEach(k=>{
		if (typeof obj[k] !== 'function'){
			fields.add(k);
		}
	});
	const map = {};
	map.values = function () {
		return Array.from(fields).map(field => obj[field]);
	}
	return Object.freeze(clone(obj , map));
}

//做任何事直到成功为止
export function doAnyThingToEnd(doFunction, checkFunction) {
    let load = false;
    let i = setInterval(function () {
        if (!load) {
            if (checkFunction()) {
                load = true;
                doFunction();
            }
        } else {
            clearInterval(i);
        }
    }, 50);
}

// 等待(某种条件)结束. //当fn()返回值为true时结束.
export function forTheEnd(fn) {
    return new Promise(resolve => {
        if (typeof fn !== 'function') {
            resolve();
            return;
        }
        doAnyThingToEnd(resolve, fn)
    })
}

export function uuid( len, radix ){
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [], i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
		// rfc4122, version 4 form
		let r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data. At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random()*16;
				uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}

export function get2DMaxItemLength( list ) {
	let lens = [];
	list.forEach(item=>lens.push(item?item.length:0));
	return Math.max(... lens);
}
import Limit from '../renderer/assest/def/limit.json';
export function getLimitItem(limit , limitGroup ) {
    return limit[limitGroup] || Limit.default;
}