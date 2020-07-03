import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
import { boot } from "../../../../local-storage";
import { appendResultFile , lastOneHistory} from "../../../../file-system/result";

export default {
	methods: {
		/*记住游戏结果*/
		async rememberGameResults( baccaratResultList , bootNo){
			const textList = this.resultsToTextList(baccaratResultList);
			// 更新到本地数据库
			/*console.log('更新到本地数据库:' , textList);*/
			await boot.update({} , {
				$set: {
					bootNo: bootNo,
					results: textList
				}
			});
		},
		/*游戏结果转换成字符串列表*/
		resultsToTextList( baccaratResultList ){
			return baccaratResultList.map(result=> result.toString());
		},
		textForList( textList ){
			return textList.join('\r\n');
		},
		// 保存游戏结果至文件
		async saveGameResultsToFile(){
			const bootHistory = await boot.findOne();
			if (bootHistory != null){
				const { bootNo , results} = bootHistory;
                const fileData = this.textForList(results);
                // 写入文件
                const filePath = await appendResultFile(fileData , bootNo);
				this.$message.success(`saved at: ${filePath}`);
			}
		},
		/*还原百家乐结果*/
		restoreGameResults( data ){
			let textList = Array.isArray(data)? data : data.split('\r\n');
			const baccaratResultList = textList.map(BaccaratResult.getResult);
			this.addResult(baccaratResultList);
		},
		/*从本地数据库中还原游戏记录*/
		async restoreGameResultsFormDb( bootNo ){
            // 从本地数据库里面获取游戏记录
            const bootHistory = await boot.findOne();
            if (bootHistory == null){
                boot.save({
                    bootNo: bootNo,
                    results: []
                });
            }else{
                const {results} = bootHistory;
                this.restoreGameResults(results);
            }
		},
		async showLast(){
			const text = await lastOneHistory();
			console.log(text);
		}
	}
}