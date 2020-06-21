export function clone( ...target ) {
    return Object.assign({} , ...target);
}

//做任何事直到成功为止
export function doAnyThingToEnd(doFunction, checkFunction) {
    let load = false;
    let i = setInterval(function () {
        if (!load){
            if (checkFunction()){
                load = true;
                doFunction();
            }
        }else{
            clearInterval(i);
        }
    }, 50);
}
// 等待(某种条件)结束. //当fn()返回值为true时结束.
export function forTheEnd( fn ) {
    return new Promise(resolve => {
        if (typeof fn !== 'function'){
            resolve();
            return ;
        }
        doAnyThingToEnd(resolve ,fn)
    })
}