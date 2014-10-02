var assert = require("assert");
var sinon = require('sinon');
var Item = require('./item.js');

describe('Item', function(){

  it('shoud be a drawable', function(){
    i = new Item();
    assert('updateView' in i);
    assert('addView' in i);
  })

  it('shoud have a position', function(){
    i = new Item();
    assert.equal(i.position.x, 0)
    assert.equal(i.position.y, 0)
  })

})