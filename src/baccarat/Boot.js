/*靴号*/
export default class Boot{
    /*
    * @number 靴的号码
    * @results 这一靴的游戏结果.
    * */
    constructor( number , results){
        this.number = number;
        this.results = results;
    }

    getNumber(){
        return this.number;
    }

    getResults(){
        return this.results;
    }
}