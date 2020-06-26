import { bean } from '../../utils';
let PointEnum = (function(){return{
    JOKER: bean({
		name:'JOKER',value:21
	}),
    K: bean({
		name:'K',value:13
	}),
    Q: bean({
		name:'Q',value:12
	}),
    J: bean({
		name:'J',value:11
	}),
    TEN: bean({
		name:'10',value:10
	}),
    NINE: bean({
		name:'9',value:9
	}),
    EIGHT: bean({
		name:'8',value:8
	}),
    SEVEN: bean({
		name:'7',value:7
	}),
    SIX: bean({
		name:'6',value:6
	}),
    FIVE: bean({
		name:'5',value:5
	}),
    FOUR: bean({
		name:'4',value:4
	}),
    THREE: bean({
		name:'3',value:3
	}),
    TWO: bean({
		name:'2',value:2
	}),
    ONE: bean({
		name:'A',value:1
	}),
    getPoint(p){
        for(let point of this.values()){
            if(p === point.value){
                return point
            }
        }
        return null;
    },
    values(){
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