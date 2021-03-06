/**
 * Created by daniel.irwin on 6/14/16.
 */

function arupex_deep_value(entity, accessor) {
    if (!entity || !accessor) {
        return undefined;
    }

    var arrayAccessor = /@((\w+)==(\w+))+/g;

    var arr = (accessor && accessor.constructor === Array) ? accessor : accessor.split('.');

    function handleArrayAccessors(isArrayAccessor, entity) {
        var props = {};
        isArrayAccessor.forEach(function (arrayAccess) {
            var params = arrayAccess.split('==');
            var propertyName = params[0].replace('@', '');
            var searchValue = params[1];
            props[propertyName] = searchValue;
        });

        var searchIndex = 0;
        entity.some(function (oneOf) {
            var isTheOne = true;

            Object.keys(props).forEach(function (prop) {
                var v = props[prop];

                var extractedValue = arupex_deep_value(oneOf, prop);
                var typeOfExtracted = typeof extractedValue;
                if(typeOfExtracted === 'boolean' || typeOfExtracted === 'number'){
                    isTheOne = isTheOne && extractedValue.toString() == v;
                }
                else{
                    isTheOne = isTheOne && extractedValue == v;
                }
            });
            if (!isTheOne) {
                searchIndex++;
                return false;
            }
            else {
                return true;
            }
        });
        if (searchIndex !== -1) {
            entity = entity[searchIndex];
        }
        return entity;
    }

    while (arr.length && entity){
        var accessKey = arr.shift();

        var isArrayAccessor = accessKey.match(arrayAccessor);

        if(isArrayAccessor && Array.isArray(entity)) {
            entity = handleArrayAccessors(isArrayAccessor, entity);
        }
        else {
            entity = entity[accessKey];
        }
    }
    return entity;
}


if(typeof module !== 'undefined'){
    module.exports = arupex_deep_value;
}