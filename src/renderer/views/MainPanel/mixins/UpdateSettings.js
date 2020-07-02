import { setting , limit } from "../../../../local-storage";

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
		},
		/*更新靴号(自动递增)*/
		async updateBootNo(){
			let {bootNo} = this.userSetting;
			bootNo = parseInt(bootNo);
			bootNo++;
			await setting.update({}, {
				$set: {
					bootNo: bootNo
				}
			})
		}
	}
}