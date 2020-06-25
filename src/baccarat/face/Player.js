import CardResult from './CardResult'
import Banker from './Banker'
import Language from '../language/Language'
const CODE = 'P';
const NAME_INDEX = '2';
const PAIRS_INDEX = '5';
export default class Player extends CardResult{

    constructor(banker){
        super();
        if(banker != null && banker instanceof Banker){
            banker.player = this;
        }
        this.banker =banker;

    }

    setBanker(banker){
        this.banker = banker;
    }

    getPairsIndex(){
        return PAIRS_INDEX;
    }

    getCode(){
        return CODE;
    }

    getName(){
        return Language.get(this.getCode());
    }

    getNameIndex(){
        return NAME_INDEX;
    }
    static getInstance (){
        return new Player();
    }

}