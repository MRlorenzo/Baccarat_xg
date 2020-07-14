import RoadCounter from "./RoadCounter";
import BaccaratResult from "../result/BaccaratResult";
import Point from "./loc/Point";
import { uuid } from "../../utils";
import BResult from "../result/BResult";

const pushPoint = Symbol(),
	popPoint = Symbol(),
	fillInRule = Symbol(),
	fillFirst = Symbol(),
	fillFirstEmpty = Symbol(),
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
		return this[pushPoint](rs);
	}

	/**
	 * 移除一个结果,并且将最后一个结果所在的点删除。
	 */
	pop(){
		/*将最后一个结果从列表中删除。*/
		const rs = super.popResult();
		return this[popPoint](rs);
	}

	/**
	 * 增加一个点
	 * @param rs
	 */
	[pushPoint]( rs ){
		let p = this.nextPoint(rs);
		this[fill](p);
		return p;
	}

	/**
	 * 删除一个点
	 * @param rs
	 */
	[popPoint](rs){

		// 最后一个点
		const lastP = this.squeezeList.pop();
		if (lastP == null){
			return ;
		}

		if (rs.isT()){
			// 删除和局列表
			const ties = lastP.getTie();
			if (ties.length > 0){
				ties.pop();
			}
		}else{
			// 置空
			lastP.setObject(null);
		}

		if (lastP.getObject() == null && lastP.getTie().length === 0){
			const { x, y} = lastP.getLocation();
			// 删除当前的点
			this.pointList[y][x] = null;
		}

		return lastP;
	}

	/**
	 * 下一个点在哪里？
	 * @param rs
	 * @param test
	 * @returns {*}
	 */
	nextPoint( rs , test = false){
		const last = this.getLastPoint();
		return this[fillInRule](last , rs , test);
	}

	/**
	 * 定义填充结果规则
	 * @param last
	 * @param rs
	 * @param test
	 * @returns {*}
	 */
	[fillInRule]( last , rs , test){
		let p = null;
		// 第一个（‘和’局不占位，但如果第一局就是‘和’就要先占一格格子，然后等待后面的非‘和’结果）
		if (last == null){
			p = this[fillFirst](rs);
		}
		else if(last.getObject() == null){
			p = this[fillFirstEmpty](last , rs , test);
		}
		// 不是第一个
		else{
			// 和局（坐标不变）
			if (rs.isT()){
				p = this[fillTie](last , rs);
			}
			// 非和局（相同的结果往下面追加，不同的结果另起一列）
			else{
				p = this[fillColumn]( last , rs, test);
			}
		}

		return p;
	}

	// 放入高度限制的点
	[fill](p){
		const { x, y} = p.getLocation();
		if (this.pointList[y] == null){
			this.pointList[y] = [];
		}
		this.pointList[y][x] = p;
		this.squeezeList.push(p);
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
		// 第一个绝对是根节点
		p.isRoot = true;
		return p;
	}

	[fillFirstEmpty](last , rs , test){
		if (rs.isT()){
			return this[fillTie](last , rs);
		}else{
			if (!test)
				last.setObject(rs);
			return last;
		}
	}

	// 填充'和'(坐标不变)
	[fillTie](last , rs){
		last.addTie(rs);
		return last;
	}

	// 填充列
	[fillColumn]( last , rs , test = false){
		let p = null;
		// 最后一个点的 {x,y}
		let { x, y, rootX, rootY } = lastXY(last);
		// 最后一个点的baccaratResult
		const lbr = last.getObject();

		if ( lbr != null){

			if (rs.getResult() === lbr.getResult()){
				let force = false;
				// 相同的结果格子下移。
				++rootY; // [表示逻辑上下移一格]
				// 拐了(右移过)接着拐
				// 如何判断是否被迫右拐？
				// 【上一个位置被迫右移一格（可能是y超过了最大值6也可能是被前一列档住）】
				if (last.isForce){
					++x;
				}
				// 笔直的
				else{
					// 先试着往下移一格，如果被占用就向上退一格并右移一格。
					++y;
					//检查是否超出范围（6）？获取下一格被占用
					// 如果超出范围右移一格，绝对不会发生右边被占用的情况
					if (y > HEIGHT || this.existXY(x , y)){
						--y; // 被占用了，向上退一格
						++x; // 向右拐
						force = true; // 被迫右拐
					}
				}

				p = point(x , y , rs);
				p.isForce = force; // 这个点是否是被迫右拐的？
			}
			// 不同的结果，按根节点的下一列开始.(如果下一列的第1行被占，则继续下一列)
			else{
				// 先将原(根)横坐标赋值给x,然后(根)横坐标+1
				// [表示逻辑上右移一格,当出现x !== rootX时,足以说明它是被占用的格子]
				x = rootX++;
				rootY = 1;
				y=1;
				// （下一列的第1个格子是否被占用了？占用了要怎么处理？）
				do {
					++x; // 一直向右拐，直到没有占用为止。
				} while (this.existXY(x , y));

				p = point(x , y , rs);
				// 每次不同的结果开始都是根节点.
				p.isRoot = true;
			}
		}else{
			//如果最后一个点全是和，将会找不到baccaratResult。因为大路只显示庄/闲
			if (!test)
				last.setObject(rs);
			p = last;
		}
		// rootX,rootY表示逻辑上的坐标，它们不受占位的影响。
		p.setRootXY(rootX , rootY);

		return p;
	}

	getLastPoint(){
		return this.getBackwards(-1);
	}

	getBackwards(index){
		if (index >0 ){
			index = -index;
		}
		return this.squeezeList[this.squeezeList.length + index];
	}

	/**
	 * 根据横坐标获取一列(忽略‘和’)
	 * @param x
	 * @returns {*[]}
	 */
	getColumnByX(x){
		const map = new Map();
		this.squeezeList.filter(p => {
			const { rootX } = p.getLocation();
			return p.z != null && rootX === x;
		}).forEach(p=>{
			const id = 	p.getObject().getId();
			map.set(id , p);
		});
		return Array.from(map.values());
	}

	/**
	 * 根据横坐标获取一列的高度
	 * @param x
	 * @returns {number}
	 */
	getColumnLength(x){
		const cols = this.getColumnByX(x);
		return cols.length;
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

	// 放入一个'庄家'结果
	b(){
		this.push(BaccaratResult.getResult(BResult.B))
	}
	// 放入一个'闲家'结果
	p(){
		this.push(BaccaratResult.getResult(BResult.P))
	}
	// 放入一个'和局'结果
	t(){
		this.push(BaccaratResult.getResult(BResult.T))
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
		return {x: 1, y: 1, rootX:1, rootY:1};
	}
	return point.getLocation();
}