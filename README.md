# deep-value


[![npm version](https://badge.fury.io/js/deep-value.svg)](https://badge.fury.io/js/deep-value) [![dependencies](https://david-dm.org/arupex/deep-value.svg)](http://github.com/arupex/deep-value) ![Build Status](https://api.travis-ci.org/arupex/deep-value.svg?branch=master) <a href='https://pledgie.com/campaigns/31873'><img alt='Pledge To Arupex!' src='https://pledgie.com/campaigns/31873.png?skin_name=chrome' border='0' ></a>

Install

    npm install deep-value --save


How to Use:

    var deep = require('deep-value');

    console.log('Checking, ' deep({ my : { value : 7} }, 'my.value'));  // 7

    console.log('Checking, ' deep({ my : {} }, 'my.value'));            // undefined

    console.log('Checking, ' deep({ notMine : {} }, 'my.value'));       // undefined