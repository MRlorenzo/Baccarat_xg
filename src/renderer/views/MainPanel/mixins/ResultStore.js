import BaccaratResult from "../../../../baccarat/result/BaccaratResult";

export default {
	methods: {
		/*记住游戏结果*/
		rememberGameResults( baccaratResultList ){
			const textList = this.resultsToTextList(baccaratResultList);
			// 更新到本地数据库
			// ...
			const fileData = this.textForList(textList);
			// 写入文件
		},
		/*游戏结果转换成字符串列表*/
		resultsToTextList( baccaratResultList ){
			return baccaratResultList.map(result=> result.toString());
		},
		textForList( textList ){
			return textList.join('\r\n');
		},
		/*还原百家乐结果*/
		restoreGameResults( data ){
			let textList = Array.isArray(data)? data : data.split('\r\n');
			const baccaratResultList = textList.map(BaccaratResult.getResult);
			console.log(baccaratResultList)
		}
	}
}