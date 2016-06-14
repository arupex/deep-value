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

});