
import LoadStatistics from "./LoadStatistics";
import Point from "../face/Point";
import BResult from "../result/BResult";
import BaccaratResult from "../result/BaccaratResult";
import { uuid } from '../../utils'
/**
 * 路基类, 存基本路子信息  无高度限制的路子
 */
export default class Load extends LoadStatistics{

    constructor(arr){
        super();
        this.arr = arr||[];
        let that = this,
            noHeightWay = this.noHeightWay = [],
            noHeightRs = this.noHeightRs = [],
            //首次和存放的位置
            tArr = this.tArr = [], previous, x = 0, y = 0 ;

        //noHeightWay 数据初始化
        this.arr.forEach(function (z) {
            z.setId(uuid(8 , 16));
            if (z.result === BResult.T){
                //开头和局
                if (!previous){
                    x = 1;
                    y = 1;
                    noHeightWay.push(previous = p = new Point(x,y,null));
                }
                previous.t.push(new Point(x,y,z));
            }else{
                if (previous && !previous.z){//首次出现和局
                    y = 1;
                }else if (previous && previous.z.result === z.result ){//同类
                    y++;
                }else {
                    x++;
                    y = 1;
                }
                if (previous && !previous.z){
                    noHeightWay[0].z = z;
                }else{
                    noHeightWay.push(previous = new Point(x,y,z));
                    if (!noHeightRs[y]){
                        noHeightRs[y]=[];
                    }
                    noHeightRs[y][x] = previous;
                }
            }
            that.pushRs(z);
        });
    }

    /**
     * 放入一个结果
     * @param e
     */
    push(e){
        //为每一个结果设置唯一id,请勿使用var定义变量
        if(!e.getId()){ //如果已经被赋予了id,请不要再设置id (OtherBigWay)
            let uuid = uuid(8 , 16);
            e.setId(uuid);
        }

        this.arr.push(e);
        this.pushRs(e);
        let previous = this.last();
        let p, tArr = this.tArr, noHeightWay = this.noHeightWay, noHeightRs = this.noHeightRs;
        let x = previous && previous.x||0, y = previous && previous.y||0;

        //放入 珠盘路
        if (e.result === BResult.T){
            //（没有上一颗）开头和局
            if (!previous){
                x = 1;
                y = 1;
                noHeightWay.push(previous = p = new Point(x,y,null));
                if (!noHeightRs[x]){
                    noHeightRs[x]=[];
                }
                noHeightRs[x][y] = previous;
            }
            previous.t.push(new Point(x,y,e));
        }else{

            if (previous && (!previous.z)){//上一颗出现特殊路子（首局为和）
                //console.log('case 1');
                y = 1;
            }else if (previous && previous.z.result === e.result ){//同类
                //console.log('case 2');
                y++;
            }else {
                //console.log('case 3');
                x++;
                y = 1;
            }

            if (previous && !previous.z){
                noHeightWay[0].z = e;
            }else{
                noHeightWay.push(p = new Point(x,y,e));
                if (!noHeightRs[y]){
                    noHeightRs[y]=[];
                }
                noHeightRs[y][x] = p;
            }
        }
        return p;
    }


    /**
     * 移除一个结果
     */
    pop(){
        let that = this, z, p;
        if (that.arr.length > 0){
            z = that.arr.pop();
            that.popRs(z);
            if (z.result === BResult.T){
                p = that.last();
                (p?p.t:that.tArr).pop();
                if (p && !that.tArr.length && !p.z){
                    that.noHeightWay.pop();
                    return p;
                }
            }else {
                p = that.noHeightWay.pop();
                that.noHeightRs[p.y] && (that.noHeightRs[p.y][p.x] = null);
                if( p.t && p.t.length > 0){
                    that.tArr = p.t;
                    p = new Point(1, 1, null);
                    p.t = that.tArr;
                    that.noHeightWay.push(p);
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
        /*n = n || Math.floor((Math.random()*84)+1);
        let b = BResult.B, p = BResult.P, t = BResult.T, result = [b, p, b, p, b, p, b, p, t];// b:p:t = 4:4:1
        let pp = [], bp = [];
        pp[11] = PairsEnum.PP;
        bp[11] = PairsEnum.BP;

        function getPairs() {
            let rs = [], temp;
            temp = pp[Math.floor((Math.random()*pp.length))];
            if (temp){
                rs.push(temp);
            }
            temp = bp[Math.floor((Math.random()*bp.length))];
            if (temp){
                rs.push(temp);
            }
            return rs;
        }

        function getRs() {
            return result[Math.floor((Math.random()*result.length))];
        }

        for (let i = 0; i < n; i++ ){
            let p = new BaccaratResult(getRs(), ...getPairs());
            this.push(p);
        }*/
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
            let p = BaccaratResult.getResultByString(`${rs}${pairs.split(' ').join('')}${sky.split(' ').join('')}`);
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

