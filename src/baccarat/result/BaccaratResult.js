import BResult from './BResult';
import Pair from './Pairs';
import SkyCard from './SkyCard';

/*const CACHE = {};*/
/*
* 由于skyCards屬性是開發后期加上的屬性,所以并没有加入构造器中
* 规定skyCards标志在末尾,目前是在字符串最后两个字符串
* */
export default class BaccaratResult {

    constructor(result , ...pairs ){
        this.result = result;
        this.pairs = pairs;
        //是否存在天牌
        this.skyCards = [];
        //庄是否6点赢
        this.bSixWin = false;
    }

    setSkyCards( skyCards ){
        if(Array.isArray(skyCards)){
            this.skyCards = skyCards.filter((sc) => sc && sc.keyCode);
        }
    }

    /*设置ID,为了识别它是哪一个结果*/
    setId( id ){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    static getResultByString(rs){
        if (rs == null){
            return null;
        }
        rs = rs.trim();

        let bResult = BResult.getBResult(rs.charAt(0));

        let pairs = BaccaratResult.getPairsByString(rs);
        //专门为后期新加的属性做处理
        let skyCards = BaccaratResult.getSkyCardsByString(rs);

        return BaccaratResult.getResult(bResult, skyCards , ...pairs);
    }

    static getPairsByString( rs ){
        if(rs.length <= 1){
            return [];
        }

        return rs.substring( 1 , 3).split('')
            .map(c => Pair.getPairs(c)).filter(d=>d);
    }

    static getSkyCardsByString( string ){
        if(string.length <= 1){
            return [];
        }
        //规定字符串最后两个位置是它的标志
        let maxLen = string.length;
        return string.substring(maxLen - 2)
            .split('')
            .map(keyCode=>SkyCard.getSkyCardByKeyCode(keyCode)).filter(d=>d);
    }

    static getResult(result , skyCards , ...pairs){
        if(typeof result === 'string'){
            return BaccaratResult.getResultByString(result);
        }
        //不要使用该死的缓存,因为它会覆盖id
        /*let key = BaccaratResult.toString(result , skyCards , ...pairs);
        let result1 = CACHE[key];
        if(result1 == null){
            result1 = CACHE[key];
            if(result1 == null){
                result1 = new BaccaratResult(result ,  ...pairs);
                CACHE[key] = result1;
            }
        }*/
        let result1  = new BaccaratResult(result ,  ...pairs);
        result1.id = null;
        //后期加上的属性,这里补充上去
        result1.setSkyCards(skyCards);

        return result1;
    }

    skyCardsArrToString(){
        return this.skyCards.map(sc =>sc.keyCode).join('');
    }

    static skyCardsArrToString( skyCards ){
        if(!Array.isArray(skyCards)){
            return '';
        }
        return skyCards.filter(sc=>sc && sc.keyCode).map(sc =>sc.keyCode).join('');
    }

    pairsArrToString(){
        if(this.pairs == null || this.pairs.length === 0){
            return "";
        }else if (this.pairs.length === 1){
            return "" + this.pairs[0].index;
        }else if (this.pairs.length === 2){
            return "" + Pair.BP.index + Pair.PP.index;
        }else {
            throw new Error('Assertion error');
        }
    }


    static  pairsArrToString(... pairs){
        if(pairs == null || pairs.length === 0){
            return "";
        }else if (pairs.length === 1){
            return "" + pairs[0].index;
        }else if (pairs.length === 2){
            return "" + Pair.BP.index + Pair.PP.index;
        }else {
            throw new Error('Assertion error');
        }
    }

    static toString(result , skyCards , ... pairs){
        if(!result || !Array.isArray(pairs)){
            return null;
        }
        return ''+result.index +
            BaccaratResult.pairsArrToString(...pairs)+
            BaccaratResult.skyCardsArrToString(skyCards)
            ;
    }

    toString(){
        if(!this.result || !Array.isArray(this.pairs)){
            return null;
        }

        return ''+this.result.index +
            this.pairsArrToString(...this.pairs) +
            this.skyCardsArrToString();
    }

    toShowString(){
        if(this.pairs == null || this.pairs.length === 0){
            return this.result.getName();
        }
        return this.result.getName() + this.pairs.values().toString();
    }


}
