import RoadCounter from "./RoadCounter";
import BaccaratResult from "../result/BaccaratResult";
import Point from "./loc/Point";
import { uuid } from "../../utils";

const pushPoint = Symbol(),popPoint = Symbol(),
	fillInRule = Symbol(),
	fillFirst = Symbol(),
	fillTie = Symbol(),
	fillColumn = Symbol(),
	fill = Symbol();
const HEIGHT = 6;
export default class Road extends RoadCounter{

	constructor(){
		super();
		// 每个'点'存放的位置(二维数组)
		this.pointList = [null,[],[],[],[],[],[]];
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
		this[pushPoint](rs);
	}

	/**
	 * 移除一个结果,并且将最后一个结果所在的点删除。
	 */
	pop(){
		/*将最后一个结果从列表中删除。*/
		const rs = super.popResult();
		const point = this[popPoint]();
		return rs;
	}

	/**
	 * 增加一个点
	 * @param rs
	 */
	[pushPoint]( rs ){
		const last = this.getLastPoint();
		let p = this[fillInRule](last , rs);
		this.squeezeList.push(p);
	}


	[fillInRule]( last , rs){
		let p = null;
		// 第一个
		if (last == null){
			p = this[fillFirst](rs);
		}
		// 不是第一个
		else{
			// 和局（坐标不变）
			if (rs.isT()){
				p = this[fillTie](last , rs);
			}
			// 非和局
			else{
				p = this[fillColumn]( last , rs);
			}
		}

		return p;
	}

	[fill](x, y , p){
		if (this.pointList[y] == null){
			this.pointList[y] = [];
		}
		this.pointList[y][x] = p;
		return p;
	}

	// 填充第一个格子
	[fillFirst]( rs ){
		let p = null;
		// 和局
		if (rs.isT()){
			p = point(1 , 1);
			p.addTie(rs);
		}
		// 非和局
		else{
			p = point(1 , 1 , rs);
		}
		// 第一个格子的根节点就是它自己
		p.setRoot(p);
		return this[fill]( 1, 1, p);
	}

	// 填充'和'(坐标不变)
	[fillTie](last , rs){
		// 最后一个点的 {x,y}
		let { x, y } = lastXY(last);
		last.addTie(rs);
		return this[fill](x , y , last);
	}

	[fillColumn]( last , rs ){
		let p = null;
		// 最后一个点的 {x,y}
		let { x, y } = lastXY(last);
		// 最后一个点的baccaratResult
		const lbr = last.getObject();

		if ( lbr != null){
			// 默认最后一个的根节点就是下一个的根节点。
			let root = last.getRoot();
			// 相同下移。
			if (rs.getResult() === lbr.getResult()){
				// 根节点的x坐标
				const rootX = root.x;
				// 拐了(右移过)接着拐
				if (x !== rootX){
					++x;
				}
				// 笔直的
				else{
					++y;
					//（检查是否超出范围（6）？如果超出范围右移一格，绝对不会发生右边被占用的情况）
					if (y > HEIGHT){
						--y; // 被占用了，向上退一格
						++x; // 向右拐
					}
					// 下移一格不超出范围，但是被别的列占用了。
					else if (this.existXY(x , y)){
						--y; // 被占用了，向上退一格
						++x; // 向右拐
					}
				}

				p = point(x , y , rs);
			}
			// 不同，根节点的下一列开始.
			else{
				x = last.getRoot().x;
				y=1;
				// （下一列的第1个格子是否被占用了？占用了要怎么处理？）
				do {
					++x; // 一直向右拐，直到没有占用为止。
				} while (this.existXY(x , y));

				p = point(x , y , rs);
				// 下一列的第一个格子就是根节点
				root = p;
			}

			p.setRoot(root);
		}else{
			//如果最后一个点全是和，将会找不到baccaratResult。因为大路只显示庄/闲
			last.setObject(rs);
			p = last;
		}

		return this[fill](x , y , p);
	}

	/**
	 * 删除一个点
	 */
	[popPoint](){
		// 最后一个点
		const lastP = this.squeezeList.pop();
		if (lastP == null){
			return ;
		}
		// 如果是和局,仅当最后一个结果为和时才删除这个点
		const ties = lastP.getTie();
		if (ties.length > 0){
			ties.pop();
		}else if (ties.length === 0){
			const { x, y} = lastP.getLocation();
			// 删除当前的点
			this.pointList[y][x] = null;
		}

		return lastP;
	}

	getLastPoint(){
		return this.squeezeList[this.squeezeList.length -1];
	}

	/**
	 * 是否存在x,y坐标
	 * @param x
	 * @param y
	 * @returns {*|boolean}
	 */
	existXY(x , y){
		const pointList = this.pointList;
		return pointList[y] && pointList[y][x] != null
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

	b(){
		this.push(BaccaratResult.getResult('1'))
	}
	p(){
		this.push(BaccaratResult.getResult('2'))
	}
	t(){
		this.push(BaccaratResult.getResult('3'))
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

function lastXY( point ) {
	if (point == null){
		return {x: 1, y: 1};
	}
	return point.getLocation();
}