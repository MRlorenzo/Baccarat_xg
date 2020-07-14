
import BResult from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";

export function fix( rs ) {
	if (rs == null){
		return null;
	}
	switch (rs.getResult()){
		case BResult.B:
			return blue();
		case BResult.P:
			return red();
	}
}
// 拿到一个红
export function red() {
	return BaccaratResult.getResult(BResult.B);
}

// 拿到一个蓝
export function blue() {
	return BaccaratResult.getResult(BResult.P);
}

export const isDev = process.env.NODE_ENV === 'development';

export function log(msg) {
	if (isDev){
		console.log(msg);
	}
}

export function logP(p , result) {
	if (isDev){
		const rsName = result.getResult().getName();
		const {x,y,rootX,rootY} = p.getLocation();
		if (x === rootX){
			console.warn(`${rsName}:放入(${x},${y})`)
		}else{
			console.warn(`${rsName}:原:(${rootX},${rootY})放入(${x},${y})`)
		}
	}
}