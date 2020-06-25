import GameResult from './GameResult'

const descriptionMap = {
    B: { tog: 'B', color: 'red' },
    P: { tog: 'P', color: 'blue' },
    T: { tog: 'T' },
    BP: { lt: true },
    PP: { rb: true }
};

export default class ResultDescription{

    constructor( gameResult = new GameResult() ){
        this.gameResult = gameResult;
    }

    bigRoute(){
        let results = this.gameResult.getResults();
        let descr = null;
        results.forEach(value=>{
			let obj = descriptionMap[value];
			descr = Object.assign(descr , obj);
        })
        return descr;
    }

}