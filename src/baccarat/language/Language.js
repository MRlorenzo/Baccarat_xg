import Chinese from './Chinese'
import English from './English'
export default {
    CHINESE : Chinese.getInstance(),
    ENGLISH : English.getInstance(),

    /**
     * 当前已选择的语言
     */
    SELECTED: Chinese.getInstance(),

    get:function(code){
        return this.SELECTED[code];
    },

    /**
     * 选择语言
     * @param language 要选择的语言
     */
    select:function(language){
        this.SELECTED = language;
        return this.SELECTED;
    },
    /**
     * 获取当前语言
     * @return Language
     */
    currentLanguage:function(){
        return this.SELECTED;
    }
}