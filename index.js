/**
 * Created by daniel.irwin on 6/14/16.
 */

function arupex_deep_value(entity, accessor){
    if(!entity || !accessor){
        return undefined;
    }
    var arr = (accessor && accessor.constructor === Array) ? accessor : accessor.split('.');
    while(arr.length && (entity = entity[arr.shift()]));
    return entity;
}


if(typeof module !== 'undefined'){
    module.exports = arupex_deep_value;
}