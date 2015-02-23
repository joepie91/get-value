# get-value [![NPM version](https://badge.fury.io/js/get-value.svg)](http://badge.fury.io/js/get-value)

> Use property paths (`a.b.c`) get a nested value from an object.


## Install with [npm](npmjs.org)

```bash
npm i get-value --save
```
### Install with [bower](https://github.com/bower/bower)

```bash
bower install get-value --save
```


## Usage

```js
var get = require('get-value');
```

## Examples

```js
var obj = {
  a: {b : {c: {d: 'foo'}}},
};

get(obj, 'a.b.c');
//=> {d: 'foo'}

get(obj, 'a.b.c.d');
//=> 'foo'
```

## Related projects

  - [get-property](https://github.com/jonschlinkert/get-property)
  - [get-object](https://github.com/jonschlinkert/get-object)


## Run tests

Install dev dependencies:

```bash
npm i -d && npm test
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 


## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on February 22, 2015._