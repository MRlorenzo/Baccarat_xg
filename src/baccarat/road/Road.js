import RoadStatistics from "./RoadStatistics";
import Point from "./Point";
import BResult from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";
import { uuid } from '../../utils';

function rule( results ) {
    const r = {
		noHeightWay: [], // Array<Point>
		noHeightRs: []   // Array<Array<Point>>
    };
    let previous = null, x = 0, y = 0 ;

	results.forEach(bs => {
		const bResult = bs.getResult();
	    // 和局
		if (bResult === BResult.T){

			if (previous == null){
				// 开头和局(没有上一个'Point')。处在第1行第1列
				x = 1; y = 1;
				// Point.object仅记录(庄|闲)
				previous = new Point(x , y , null);
				r.noHeightWay.push(previous);
				r.noHeightRs[y]=[];
				r.noHeightRs[y][x] = previous;
			}
			// 本次迭代的'Point', 就是下次迭代的'上一个Point'
			// ‘上一个Point’新增一个对子，但是不占位置。
			previous.addTie(new Point(x, y , bs));
		} else {

			if (previous == null){
				// 没有上一个'Point', 并且不是‘和局’。处在第1行第1列
				x = 1; y = 1;
			}else {
				const baccaratResult = previous.getObject();

				if (baccaratResult == null){
					// 上一个格子‘和局’，保持原来的位置
				} else {

					if (baccaratResult.getResult() === bResult ){
						// (与上一局)同庄 | 同闲, 下移一格
						y++;
					}else {
						// 不同庄 | 不同闲, 右移一格，并且处在第1行
						x++; y = 1;
					}
				}
			}

			// 本次迭代的'Point', 就是下次迭代的'上一个Point'
			previous = new Point(x, y , bs);
			r.noHeightWay.push(previous);
			if (r.noHeightRs[y] == null){
				r.noHeightRs[y]=[];
			}
			r.noHeightRs[y][x] = previous;
		}

    });
    return r;
}
/**
 * 路基类, 存基本路子信息  无高度限制的路子
 */
export default class Road extends RoadStatistics{

    constructor(arr = []){
        super();
        // Array<BaccaratResult>
        this.arr = arr.map(bs=>{
        	bs.setId(uuid(8 , 16));
        	return bs;
		});

		const {noHeightWay , noHeightRs} = rule(this.arr);
		this.noHeightWay = noHeightWay;
		this.noHeightRs = noHeightRs;
    }

    /**
     * 放入一个结果
     * @param e
     */
    push(e){
        //为每一个结果设置唯一id,请勿使用var定义变量
        if(!e.getId()){ //如果已经被赋予了id,请不要再设置id (OtherBigWay)
            let id = uuid(8 , 16);
            e.setId(id);
        }

        this.arr.push(e);
        this.pushRs(e);
		const {noHeightWay , noHeightRs} = rule(this.arr);
		this.noHeightWay = noHeightWay;
		this.noHeightRs = noHeightRs;
    }


    /**
     * 移除一个结果
     */
    pop(){
        let p;
        if (this.arr.length > 0){
        	const bs = this.arr.pop();
        	this.popRs(bs);
        	const bResult = bs.getResult();
        	if ( bResult === BResult.T){
        		p = this.last();
        		if (p != null){
        			p.tie.pop();
        			if (p.getObject() != null){
        				this.noHeightWay.pop();
        				return p;
					}
				}
			} else {
        		p = this.noHeightWay.pop();
        		const { x, y} = p.getLocation();
        		this.noHeightRs[y] && (this.noHeightRs[y][x] = null);
        		const tie = p.getTie();
        		if (tie && tie.length > 0 ){
        			p = new Point(1 , 1 , null);
        			p.setTie(tie);
        			this.noHeightWay.push(p);
				}
				return p;
			}
		}

        return null;
    }


    /**
     * 新开一局
     */
    newGame() {
        this.clear();
    }

    /**
     * 清除结果
     */
    clear(){
        this.arr = [];
        this.noHeightWay = [];
        this.noHeightRs = [];
        this.reSet();
    }

    /**
     * 获取最后一个点
     */
    last(){
        let arr = this.noHeightWay, index = arr.length;
        return index > 0 ? arr[index-1] : null;
    }


    show(){

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

        for (let i = 0; i < n; i++ ){
            let rs = rsTxt.charAt(range(0 , rsTxt.length -1) );
            let pairs = pairsTxt.charAt(range(0 , pairsTxt.length -1) ) + pairsTxt.charAt(range(0 , pairsTxt.length -1) );
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

            let p = BaccaratResult.getResult(parseText);

            this.push(p);
        }

    }

    getResults(){

    }
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

