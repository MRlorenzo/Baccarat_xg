import Card from './Card';
const _initFn = Symbol();

export default class CardMaster{

    constructor( masters , cardList ){
        this.bankerCardList = [];
        this.playerCardList = [];
        this[_initFn]( masters , cardList);
    }

    [_initFn](masters , cardList ){

        if(masters.length !== cardList.length || masters.length < 4 || cardList.length < 4){
            throw new Error('解析的数据不完整');
        }

        masters.forEach((m , index) =>{
            let isBanker = m;
            if(isBanker){
                this.bankerCardList.push(cardList[index]);
            }else{
                this.playerCardList.push(cardList[index]);
            }
        });

    }

    getBankerCardList(){
        return this.bankerCardList;
    }

    getPlayerCardList(){
        return this.playerCardList;
    }

    toStoreString(){
        return JSON.stringify({
            bcjList:this.bankerCardList.map(card=>card.toJson()),
            pcjList:this.playerCardList.map(card=>card.toJson())
        });
    }

    static parseForStoreString( string ) {
        let cardMaster = null;
        try {
            let { bcjList , pcjList} = JSON.parse(string);

            let bankerCardList = bcjList.map(json => Card.getCardByJSONString(json));
            let playerCardList = pcjList.map(json => Card.getCardByJSONString(json));
            cardMaster = this.getObject( bankerCardList , playerCardList );
        }catch (e){}

        return cardMaster;
    }


    static getObject( bankerCardList ,  playerCardList ){
        let obj = {
            bankerCardList,
            playerCardList,
            getBankerCardList:function(){
                return this.bankerCardList;
            },
            getPlayerCardList:function () {
                return this.playerCardList;
            }
        }
        return obj;
    }

}