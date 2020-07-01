import BaccaratResult from "../../../../baccarat/result/BaccaratResult";
import Result from "../../../../baccarat/result/BResult";
import Pairs from "../../../../baccarat/result/Pairs";

export default {
	methods: {
		/*游戏统计数据*/
		getGameCountList(){
			let arr = [];
			arr.push({
				item: new BaccaratResult(Result.B),
				name: this.$t('game.bankerWin'),
				sum: this.$road.bCount
			});

			arr.push({
				item: new BaccaratResult(Result.P),
				name: this.$t('game.playerWin'),
				sum: this.$road.pCount
			});

			arr.push({
				item: new BaccaratResult(Result.T),
				name: this.$t('game.tieWin'),
				sum: this.$road.tCount
			});

			arr.push({
				item: new BaccaratResult(Result.B , [Pairs.BP]),
				name: this.$t('game.bankerPairs'),
				sum: this.$road.bPCount
			});

			arr.push({
				item: new BaccaratResult(Result.P , [Pairs.PP]),
				name: this.$t('game.playerPairs'),
				sum: this.$road.pPCount
			});

			arr.push({
				item: new BaccaratResult(null),
				name: this.$t('game.skyCards'),
				sum: this.$road.skyCard
			});

			return arr;
		}
	}
}