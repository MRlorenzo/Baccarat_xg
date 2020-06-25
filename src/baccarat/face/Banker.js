
import CardResult from './CardResult'
import Player from './Player'
import Language from '../language/Language'

const CODE = 'B';
const NAME_INDEX = '1';
const PAIRS_INDEX = '4';

export default class Banker  extends CardResult{

    constructor(player){
        super();
        if(player != null && player instanceof Player){
            player.banker = this;
        }
        this.player =player;

    }

    getPairsIndex(){
        return PAIRS_INDEX;
    }

    getCode(){
        return CODE;
    }

    getNameIndex(){
        return NAME_INDEX;
    }

    setPlayer(player){
        if(!(player instanceof Player)){
            throw new Error('不是Player');
        }
        this.player = player;
    }

    getName(){
        return Language.get(this.getCode());
    }

    static getInstance(){
        return new Banker();
    }



}