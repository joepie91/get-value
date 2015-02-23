/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
require('should');
var argv = require('minimist')(process.argv.slice(2));
var files = fs.readdirSync('./benchmark/code');
var get = require('./');

var keys = Object.keys(argv);
if (keys && keys[1]) {
  var lib = files.filter(function (fp) {
    return keys[1] === path.basename(fp, path.extname(fp));
  });
  get = require(path.resolve('./benchmark/code/' + lib[0]));
}


describe('get', function() {
  it('should use property paths to get nested values from the source object.', function () {
    var fixture = {
      a: {locals : {name: {first: 'Brian'}}},
      b: {locals : {name: {last: 'Woodward'}}}
    };
    get(fixture, 'a.locals.name').should.eql({first: 'Brian'});
    get(fixture, 'b.locals.name').should.eql({last: 'Woodward'});
    get(fixture, 'b.locals.name.last').should.eql('Woodward');
  });

  it('should return `null` if the path is not found', function () {
    var fixture = {};
    (get(fixture, 'a.locals.name') == null).should.be.true;
    (get(fixture, 'b.locals.name') == null).should.be.true;
  });

  it('should get the specified property.', function () {
    get({a: 'aaa', b: 'b'}, 'a').should.eql('aaa');
    get({first: 'Jon', last: 'Schlinkert'}, 'first').should.eql('Jon');
    get({locals: {a: 'a'}, options: {b: 'b'}}, 'locals').should.eql({a: 'a'});
  });

  it('should get a value only.', function () {
    get({a: 'a', b: {c: 'd'}}, 'a').should.eql('a');
  });

  it('should ignore dots in escaped keys when `true` is passed.', function () {
    get({'a.b': 'a', b: {c: 'd'}}, 'a\\.b', true).should.eql('a');
    get({'a.b': {b: {c: 'd'}}}, 'a\\.b.b.c', true).should.eql('d');
  });

  it('should return the entire object if no property is passed.', function () {
    get({a: 'a', b: {c: 'd'}}).should.eql({a: 'a', b: {c: 'd'}});
  });

  it('should get a value only.', function () {
    get({a: 'a', b: {c: 'd'}}, 'b.c').should.eql('d');
  });

  it('should get the value of a deeply nested property.', function () {
    get({a: {b: 'c', c: {d: 'e', e: 'f', g: {h: 'i'}}}}, 'a.c.g.h').should.eql('i');
  });

  it('should return an empty object if the first value is null.', function () {
    get(null, 'a.c.g.h').should.eql({});
  });
});
