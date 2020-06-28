import BResult from './BResult';
import Pair from './Pairs';
import SkyCard from './SkyCard';

// 庄对: '4' , 闲对: '5'
const pairCodes = Pair.values().map(pair=>pair.getIndex().toString());
// 庄天牌: '+', 闲天牌
const skyCodes = SkyCard.values().map(sky=> sky.getKeyCode());

// 从字符串中解析结果
function getResultByString( rs ) {
    if (rs == null){
        return null;
    }
    rs = rs.trim();

    const rsIndex = parseInt(rs.charAt(0));
    let bResult = BResult.getBResult(rsIndex);

    let pairs = BaccaratResult.getPairsByString(rs);

    let skyCards = BaccaratResult.getSkyCardsByString(rs);

    return new BaccaratResult(bResult , pairs , skyCards);
}
/*
* 百家乐游戏结果
* */
export default class BaccaratResult {

    constructor(result , pairs , skyCards , bSixWin = false){
        this.result = result;
        this.pairs = pairs;
        // 是否存在天牌
        // 规定skyCards标志在末尾,目前是在字符串最后两个字符串
        this.skyCards = skyCards;
        this.id = null;
        // 庄是否6点赢
        this.bSixWin = bSixWin;
    }

    getResult(){
        return this.result;
    }

    setResult(result){
        this.result = result;
    }

    getPairs(){
        return this.pairs;
    }

    setPairs(pairs){
        this.pairs = pairs;
    }

    getSkyCards(){
        return this.skyCards;
    }

    setSkyCards( skyCards ){
        this.skyCards = skyCards;
    }

    /*设置ID,为了识别它是哪一个结果*/
    setId( id ){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    isBankerSixWin(){
        return this.bSixWin;
    }

    setBankerSixWin( bSixWin ){
        this.bSixWin = bSixWin;
    }

    // 转字符串(序列化)
    toString(){
        if(!this.result || !Array.isArray(this.pairs)){
            return null;
        }

        return ''+this.result.getIndex() +
            this.pairsArrToString() +
            this.skyCardsArrToString();
    }

    // 天牌转字符串(貌似没有卵用)
    skyCardsArrToString(){
        return this.skyCards.map(sc =>sc.keyCode).join('');
    }

    // 对子转字符串(貌似没有卵用)
    pairsArrToString(){
        if(this.pairs == null || this.pairs.length === 0){
            return "";
        }else if (this.pairs.length === 1){
            return "" + this.pairs[0].getIndex();
        }else if (this.pairs.length === 2){
            return "" + Pair.BP.getIndex() + Pair.PP.getIndex();
        }else {
            throw new Error('Assertion error');
        }
    }

    /**
     * 根据字符串解析对子
     * 形如'{bResult}?{pair.B}?{pair.P}?{sky.B}?{sky.P}'
     * 第2|3个字符分别指代(庄对|闲对)，可能只有一个，也可能同时存在两个
     * 但要注意和天牌标志区分开来，因为天牌虽然只会出现在末尾，但有可能会出现在第2|3个字符中。
     * 其中，庄对对应字符'4',闲对对应字符'5'
     * 庄天牌对应字符'+',闲天牌对应字符'-'
     * @param rs
     * @returns {*}
     */
    static getPairsByString( rs ){
        if(rs.length <= 1){
            return [];
        }
        // 只保留包含在pairCodes中的字符。
        const strList = rs.split('').filter(str=> pairCodes.includes(str));

        return strList.map(c => {
            const index = parseInt(c);
            return Pair.getPairs(index);
        });
    }

    /**
     * 根据字符串解析天牌
     * 庄天牌对应字符'+',闲天牌对应字符'-'
     * @param string
     * @returns {*}
     */
    static getSkyCardsByString( string ){
        if(string.length <= 1){
            return [];
        }
        // 只保留包含在skyCodes中的字符。
        const strList = string.split('').filter(str=> skyCodes.includes(str));

        return strList.map(code => SkyCard.getSkyCardByKeyCode(code));
    }

    static getResult(result , skyCards , pairs , bSixWin){
        if(typeof result === 'string'){
            return getResultByString(result);
        }
        return new BaccaratResult(result ,  pairs , skyCards , bSixWin);
    }

}
