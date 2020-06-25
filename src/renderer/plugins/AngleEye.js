import AngleEyeHelper from '../../port/AngleEyeHelper';
import { ipcRenderer } from 'electron';
export default {
    install(Vue , options){
        const helper = new AngleEyeHelper();

        Vue.prototype.$angleEye = helper;

        ipcRenderer.on('stopPort' , event => {
            // 没有捕获异常，是否成功关闭我们不知道。
            helper.close().catch(e=>{
                console.error(e);
            });
        })
    }
}