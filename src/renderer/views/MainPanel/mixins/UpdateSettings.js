import { setting , limit } from "../../../../local-storage";

export default {
	methods: {
		async submitSetting({ userSetting, limitItem}){
			this.userSetting = userSetting;
			this.limitItem = limitItem;
			// 更新本地数据库
			await setting.update({} , userSetting);
			const oldLimit = clone(this.limit);

			await limit.update({} , oldLimit);
		},
		async changeColor( style ){
			this.userSetting.backgroundColor = style;
			// 更新本地数据库
			await setting.update({} , {
				$set: {
					backgroundColor: style
				}
			})
		}
	}
}