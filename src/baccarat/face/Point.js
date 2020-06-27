import { dataBean , enums } from '../../utils';
let PointEnum = enums({
	JOKER: dataBean({
		name:'JOKER',value:21
	}),
	K: dataBean({
		name:'K',value:13
	}),
	Q: dataBean({
		name:'Q',value:12
	}),
	J: dataBean({
		name:'J',value:11
	}),
	TEN: dataBean({
		name:'10',value:10
	}),
	NINE: dataBean({
		name:'9',value:9
	}),
	EIGHT: dataBean({
		name:'8',value:8
	}),
	SEVEN: dataBean({
		name:'7',value:7
	}),
	SIX: dataBean({
		name:'6',value:6
	}),
	FIVE: dataBean({
		name:'5',value:5
	}),
	FOUR: dataBean({
		name:'4',value:4
	}),
	THREE: dataBean({
		name:'3',value:3
	}),
	TWO: dataBean({
		name:'2',value:2
	}),
	ONE: dataBean({
		name:'A',value:1
	}),
	getPoint(p){
		for(let point of this.values()){
			if(p === point.value){
				return point
			}
		}
		return null;
	}
})

export default PointEnum;