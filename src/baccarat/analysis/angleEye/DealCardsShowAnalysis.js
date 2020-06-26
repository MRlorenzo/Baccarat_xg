import CardDrawingAnalysis from "./CardDrawingAnalysis";

/**
 * 发牌结果数据解析，由于数据来源于荷官抽牌的时刻，因此可以从CardDrawingAnalysis中获取发牌顺序
 */
export default class DealCardsShowAnalysis extends CardDrawingAnalysis{
	constructor(completeData){
		super(completeData);
	}
}