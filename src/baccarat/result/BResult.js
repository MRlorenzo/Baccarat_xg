let BResultEnum = {
    /**
     * 庄赢
     */
    B:{index:1 , name:()=>'B'},
    /**
     * 闲赢
     */
    P:{index:2 , name:()=>'P'},
    /**
     * 和
     */
    T:{index:3 , name:()=>'T'},

    getBResult:function(index){
        for(let bResult of this.values()){
            if(index === bResult.index){
                return bResult;
            }
        }
        return null;
    },

    values:function(){
        let list = [];
        for(let k in this){
            if(k !== 'values' && k!== 'getBResult'){
                list.push(this[k]);
            }
        }
        return list;
    }
}

export default BResultEnum;