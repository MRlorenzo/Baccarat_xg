function toString() {
    return this.name;
}
let PairsEnum = {
    /**
     * 庄对
     */
    BP:{ index: 4 , name:'庄对'  , toString:toString },
    /**
     * 闲对
     */
    PP:{ index :5 , name:'闲对' , toString:toString},

    getPairs:function(index){
        for(let pairs of this.values()){
            if(index === pairs.index){
                return pairs;
            }
        }
        return null;
    },

    values:function(){
        let list = [];
        for(let k in this){
            if(k !== 'values' && k!== 'getPairs'){
                list.push(this[k]);
            }
        }
        return list;
    }
}

export default PairsEnum;