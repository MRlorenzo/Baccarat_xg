const ColorEnum = {
    RED:'红色',BLACK:'黑色'
};
//不能向对象中新添加属性和方法
Object.freeze(ColorEnum);

export default ColorEnum;