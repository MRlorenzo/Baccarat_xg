import RoadCounter from "./RoadCounter";
import BaccaratResult from "../result/BaccaratResult";

export default class Road extends RoadCounter{

	constructor(){
		super();
		this.pointList = [];
		this.resultList = [];
	}

	/**
	 * 放入一个结果
	 * @param rs
	 */
	push( rs ){
		super.pushResult(rs);
	}

	/**
	 * 移除一个结果
	 */
	pop(){
		// 找到目标
		// 然后
		// super.popResult(rs);
	}

	newGame(){
		this.pointList = [];
		this.resultList = [];
		super.clear();
	}

	/**
	 * 生成新的随机的一局
	 * @param n
	 */
	random(n){
		n = n || Math.floor((Math.random()*84)+1);
		let rsTxt = getRsTxt({ '1':45, '2':45, '3':10});

		let pairsTxt = getRsTxt({'4':1,'5':1,' ':10});
		let skyTxt = getRsTxt({'+':2,'-':2,' ':18});

		for (let i = 0; i < n; i++ ) {
			const rs = genBaccaratResult(rsTxt , pairsTxt , skyTxt);
			this.push(rs);
		}
	}

}

function genBaccaratResult( rsTxt , pairsTxt , skyTxt) {
	let rs = rsTxt.charAt(range(0 , rsTxt.length -1) );
	let pairs = pairsTxt.charAt(range(0 , pairsTxt.length -1) )
			+ pairsTxt.charAt(range(0 , pairsTxt.length -1) );
	let sky1 = skyTxt.charAt(range(0 , skyTxt.length -1) );
	let sky2 = skyTxt.charAt(range(0 , skyTxt.length -1) );

	let sky = sky1 !== sky2 ?sky1 + sky2:sky1;

	if(rs === '1'){
		//庄赢了,但是庄没有天牌,则闲必定没有天牌
		if(~sky.indexOf('-') && !~sky.indexOf('+')){
			sky = '';
		}
	}else if(rs === '2'){
		if(~sky.indexOf('+') && !~sky.indexOf('-')){
			sky = '';
		}
	}else{
		//打和, 要么都没有天牌,要么都有天牌
		if(!((!~sky.indexOf('-')) ^ (!~sky.indexOf('+')))){
			sky = '';
		}
	}
	const parseText = `${rs}${pairs.split(' ').join('')}${sky.split(' ').join('')}`;

	return BaccaratResult.getResult(parseText);
}

function getRsTxt( props ){
	return Object.keys(props).map(k=>{
		let txt = '';
		let len = props[k];
		for(let i=0; i<len ; i++){
			txt +=k;
		}
		return txt;
	}).join('');
}

function range( first , end = 100 ){

	return first + Math.floor(Math.random() * (end+1 - first));
}
