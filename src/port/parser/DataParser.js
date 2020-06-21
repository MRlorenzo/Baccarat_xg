/**
 * 数据解析基类
 * products是解析的结果,解析完的结果 this.products.push()
 */
export default class DataParser{

    constructor(){
        this.products = [];
    }

    /**
     * 解析
     * @param data 数组
     */
    parse( data ){
        this.products.push(data);
    }

    /**
     * 取下一个结果
     * @returns {*} 一维数组
     */
    next(){
        return this.products.shift();
    }

    /**
     * 是否还有下一个结果
     * @returns {boolean} true or false
     */
    hasNext(){
        return !!this.products.length;
    }

}