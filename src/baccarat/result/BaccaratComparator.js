import BaccaratResult from './BaccaratResult'
/*
* 百家乐结果对比
* */
export default class BaccaratComparator {

    constructor(o1, o2){
        this.o1 = o1;
        this.o2 = o2;
    }

    compare(o1 , o2){
        if(o1 == null && o2 == null){
            return 0;
        }else if(o1 == null){
            return -1;
        }else if(o2 == null){
            return 1;
        }else{
            return o1.getPoint() - o2.getPoint();
        }
    }

    setResult(o1 , o2){
        this.o1 = o1;
        this.o2 = o2;
    }

    getResult(){
        let sb = '';
        let compare = this.compare(this.o1 , this.o2);
        if(compare > 0){
            //庄赢
           sb += this.o1.getNameIndex();
        }else if(compare === 0){
            //和
            sb += '3';
        }else{
            //闲赢
            sb += this.o2.getNameIndex();
        }
        if(this.o1.isTie()){
            sb+= this.o1.getPairsIndex();
        }
        if(this.o2.isTie()){
            sb += this.o2.getPairsIndex();
        }

        return BaccaratResult.getResult(sb);
    }

}