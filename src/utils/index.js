export function clone(...target) {
    return Object.assign({}, ...target);
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