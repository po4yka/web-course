const should = require("should")
const chai = require("chai")
const index = require("../src/index")
const assert = require("assert");

describe("Test index", function() {
    it("object", function() {
        index.table.should.have.property("leg", 4)
    })

    it("function", function() {
        assert.equal(1, index.fib(1));
        assert.equal(1, index.fib(2));
        assert.equal(2, index.fib(3));
        assert.equal(5, index.fib(5));
        assert.equal(21, index.fib(8));
    })

    it("class", function() {
        let ob = new index.CL(2);
        assert.equal(5, ob.add(3));
        assert.equal(3, ob.add(1));
    })
})