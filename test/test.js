/**
 * Created by daniel.irwin on 6/14/16.
 */

describe('test deep-value', function(){
    var deep = require('../index');
    var assert = require('assert-diff').deepEqual;

    it('test no object', function(){
        assert(deep(undefined, 'my.object.v'), undefined);
    });

    it('test no object second level', function(){
        assert(deep({ my : {object : {}}}, 'my.object.v'), undefined);
    });

    it('no value', function(){
        assert(deep({ my : { object : { v : undefined } } }, 'my.object.v'), undefined);
    });

    it('happy path', function(){
        assert(deep({ my : { object : { v : 1 } } }, 'my.object.v'), 1);
        assert(deep({ my : { object : { v : 1 } } }, 'my.object'), { v : 1 });
        assert(deep({ my : { object : { v : 1 } } }, 'my'), { object : { v : 1 } } );
    });



    it('access array', function(){
        assert(deep({ my : { object : [{ v : 1 }] } }, 'my.object.0.v'), 1);
        assert(deep({ my : [ { object : { v : 1 } }] }, 'my.0.object'), { v : 1 });
        assert(deep([{ my : { object : { v : 1 } } }], '0.my'), { object : { v : 1 } } );
    });


    it('access array by value', function(){
        assert(deep({ my : { object : [{i : 1},{ i: 2,  v : 1 }] } }, 'my.object.@i==2.v'), 1);
        assert(deep({ my : [ {i : 1},{ i: 2, object : { v : 1 } }] }, 'my.@i==2.object'), { v : 1 });
        assert(deep([{ i : 1 }, { i: 2, my : { object : { v : 1 } } }], '@i==2.my'), { object : { v : 1 } } );
    });

    it('access array by multi-value', function(){
        assert(deep({ my : { object : [{i : 2, z : 1},{i : 1},{z: 2, i: 2,  v : 1 }] } }, 'my.object.@i==2,@z==2.v'), 1);
        assert(deep({ my : [ {i : 1},{z : 2},{ z:2, i: 2, object : { v : 1 } }] }, 'my.@i==2,@z==2.object'), { v : 1 });

        assert(deep([{ i : 1 },{i : 2, z : 2}, { i: 2, z: 1, my : { object : { v : 1 } } }], '@z==2,@i==2.my'), undefined);
        assert(deep([{ i : 1 },{i : 2, z : 2}, { i: 2, z: 1, my : { object : { v : 1 } } }], '@z==1,@i==2.my'), { object : { v : 1 } } );

        assert(deep({ notMine : [{ i : 1 , b : 2},{ i : 2, b : 2},{ i : 2, b : 1, v : 2}] }, 'notMine.@i==2,@b==1.v'), 2);

        assert(deep({ notMine : [{ i : 1 , b : 2},{ i : 2, b : 2},{ i : 2, b : 1, v : 2}] }, 'notMine.@i==2,@b==1'), { i : 2, b : 1, v : 2});


    });



    it('access array by boolean', function(){
        assert(deep({ my : { object : [{i : 1},{ i: true,  v : 1 }] } }, 'my.object.@i==true.v'), 1);
        assert(deep({ my : [ {i : 1},{ i: true, object : { v : 1 } }] }, 'my.@i==true.object'), { v : 1 });
        assert(deep([{ i : 1 }, { i: false, my : { object : { v : 1 } } }], '@i==false.my'), { object : { v : 1 } } );
    });

    it('access array by boolean2', function(){
        assert(deep({
            supported_locales: [
                {locale: 'en_US', default: false},
                {locale: 'nb_NO', default: false},
                {locale: 'jp_JP', default: true},
                {locale: 'it_IT', default: false}
            ]
        }, 'supported_locales.@default==true.locale'), 'jp_JP');
    });




});