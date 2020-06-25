let PointEnum = (function(){return{
    JOKER:{
        name:'JOKER',value:21
    },
    K:{
        name:'K',value:13
    },
    Q:{
        name:'Q',value:12
    },
    J:{
        name:'J',value:11
    },
    TEN:{
        name:'10',value:10
    },
    NINE:{
        name:'9',value:9
    },
    EIGHT:{
        name:'8',value:8
    },
    SEVEN:{
        name:'7',value:7
    },
    SIX:{
        name:'6',value:6
    },
    FIVE:{
        name:'5',value:5
    },
    FOUR:{
        name:'4',value:4
    },
    THREE:{
        name:'3',value:3
    },
    TWO:{
        name:'2',value:2
    },
    ONE:{
        name:'A',value:1
    },
    getPoint:function(p){
        for(let point of this.values()){
            if(p === point.value){
                return point
            }
        }
        return null;
    },
    values:function(){
        let list = [];
        for(let k in this){
            if(k !== 'values' && k!== 'getPoint'){
                list.push(this[k]);
            }
        }
        return list;
    }
}
})();
//不能向对象中新添加属性和方法
Object.freeze(PointEnum);

export default PointEnum;