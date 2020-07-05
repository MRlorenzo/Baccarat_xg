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
			this.$notify.success(this.$t('settings.updated'));
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
			const oldSetting = clone(this.userSetting);
			let {bootNo} = this.userSetting;
			bootNo = parseInt(bootNo);
			++bootNo;
			oldSetting.bootNo = bootNo;
			this.userSetting = oldSetting;
			await setting.update({}, {
				$set: {
					bootNo: bootNo
				}
			});
			return bootNo;
		}
	}
}