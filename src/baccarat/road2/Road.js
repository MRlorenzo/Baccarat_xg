import RoadCounter from "./RoadCounter";
import BaccaratResult from "../result/BaccaratResult";
import Point from "./loc/Point";
import { uuid } from "../../utils";

export default class Road extends RoadCounter{

	constructor(){
		super();
		// 每个'点'存放的位置(二维数组)
		this.pointList = [];
		// 按顺序排列的点，依次保存每个'点'(一维数组)
		this.squeezeList = [];
	}

	/**
	 * 放入一个结果，然后根据‘大路’的规则将每个点存放到相应的位置上
	 * (不考虑高度的限制)
	 *
	 * @param rs
	 */
	push( rs ){
		if (rs.getId() == null){
			rs.setId(uuid(8 , 32));
		}
		/*统计*/
		super.pushResult(rs);
		this.addPoint(rs);
	}

	/**
	 * 移除一个结果,并且将最后一个结果所在的点删除。
	 */
	pop(){
		/*将最后一个结果从列表中删除。*/
		const rs = super.popResult();
		this.delPoint(rs);
	}

	/**
	 * 增加一个点
	 * @param rs
	 */
	addPoint( rs ){

		const last = this.squeezeList[this.squeezeList.length -1];
		// 最后一个点的 {x,y}
		const {x:lastX, y: lastY} = last!= null ?
			last.getLocation()
			: {x: 1, y: 1};

		// 最后一个点的baccaratResult
		const lbr = last && last.getObject();

		let p = null;
		let x ,y;

		if (lbr == null){ // 第一个
			x = 1;
			y = 1;
			if (rs.isT()){
				p = point(x , y);
				p.addTie(rs);
			}else{
				p = point(x , y , rs);
			}
		}else{
			// 和局
			if (rs.isT()){
				last.addTie(rs);
				p = last;
			}else {
				// 非和局
				// 相同下移，不同右移
				if (rs.getResult() === lbr.getResult()){
					x= lastX;
					y= lastY + 1;
				}else{
					x = lastX + 1;
					y=1;
				}
				p = point(x , y , rs);
			}
		}

		if (this.pointList[y] == null){
			this.pointList[y] = [];
		}
		this.pointList[y][x] = p;
		this.squeezeList.push(p);
	}

	/**
	 * 删除一个点
	 * @param rs
	 */
	delPoint( rs ){
		// 最后一个点
		const lastP = this.squeezeList.pop();
		if (lastP == null){
			return ;
		}
		// 如果是和局,仅当最后一个结果为和时才删除这个点
		if (rs.isT()){
			const ties = lastP.getTie();
			ties.pop();
			if (ties.length === 0){
				const { x, y} = lastP.getLocation();
				// 删除当前的点
				this.pointList[y][x] = null;
			}
		}else{

			const brs = lastP.getObject();
			if (brs.getId() !== rs.getId()){
				throw new Error('最后一个点的游戏结果不匹配');
			}

			const { x, y} = lastP.getLocation();
			// 删除当前的点
			this.pointList[y][x] = null;
		}
	}

	/**
	 * 新的一局（新靴）
	 * 将所有的点位清空
	 */
	newGame(){
		this.pointList = [];
		this.squeezeList = [];
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

/**
 * 点
 * @param x	横坐标
 * @param y 纵坐标
 * @param baccaratResult 百家乐结果
 * @returns {Point}
 */
function point(x , y , baccaratResult) {
	return new Point(x , y , baccaratResult);
}
