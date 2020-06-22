/*天使靴数据*/
import CompleteData from '../CompleteData';

export default class AngleEyeData extends CompleteData{
	constructor(source , config){
		super(source);
		const { startFlag , endFlag , typeIndex } = config;
		this.startFlag = startFlag;
		this.endFlag = endFlag;
		this.typeIndex = typeIndex;
		this.data = null;
		this.legal = null;
		this.type = null;
		this.index = null;
	}

	isLegal(){

		if (this.legal == null){
			let d= this.source;
			if(d == null || d.length < 4){
				return false;
			}
			let startIndex= d.indexOf(this.startFlag) ,endIndex = d.lastIndexOf(this.endFlag);
			let [a , b] = d.slice(endIndex + 1);

			let rs = d.slice(startIndex +1 , endIndex +1).reduce((acc, cur)=>{
				return acc ^ cur;
			},0);

			try{
				/*
				* data: Array
				* {1}   {1}      {2~3} {1}  {2}
				* [ENQ][Seq.ct.][Data][ETX][BCC]
				* 最后两位作为校验位,ascii分别对应的字符拼接成标识16进制数的字符串,换算成10进制后进行比较
				* 公式:
				*   [Seq.ct] ^ [Data] ^ [ETX] == eval('0x'+String.fromCharCode(BCC[0],  BCC[1])
				* */
				this.legal = eval('0x'+String.fromCharCode(a,  b)) === rs;
			}catch (e){
				this.legal = false;
			}
		}

		return this.legal;
	}

	/**
	 * ${1} 5 是起始位
	 * ${2} ? 是index
	 * ${3,4|,5} ? 是数据位
	 * ${-3} 3 是停止位
	 * ${-2} ? 未知   最后两位的ascii对应的字符是16进制形式,例如  ${-2}(51)  ${-1}(65) -> '3A' 换算成10进制就是58
	 * ${-1} ? 未知
	 */
	getData(){
		if (this.data == null){
			const data = this.source;
			if(data){
				this.data = data.slice(data.indexOf(this.startFlag) + 2, data.lastIndexOf(this.endFlag));
			}
		}
		return this.data;
	}

	getType(){
		if (this.type == null){
			this.type = this.source[this.typeIndex];
		}
		return this.type;
	}

	getIndex(){
		if (this.index == null){
			this.index = -1;
			if(this.source){
				let [_ , indexCode] = this.source;
				let number = parseInt(String.fromCharCode(indexCode));
				this.index =  isNaN(number)? -1 : number;
			}
		}

		return this.index;
	}
}