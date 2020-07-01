import { setting , limit } from "../../../../local-storage";
import { clone } from "../../../../utils";

export default {
	methods: {
		async submitSetting({ userSetting, userLimit}){
			this.userSetting = userSetting;
			this.userLimit = userLimit;
			// 更新本地数据库
			await setting.update({} , userSetting);
			await limit.update({} , userLimit);
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