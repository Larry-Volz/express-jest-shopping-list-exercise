process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let catsup = { name: "catsup" };

beforeEach(function() {
  items.push(catsup);
});

afterEach(function() {
    // make sure this *mutates*, not redefines, `items`
    items.length = 0;
  });
  // end afterEach

  