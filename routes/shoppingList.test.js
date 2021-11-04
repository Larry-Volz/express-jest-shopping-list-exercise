process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let cookies = { name: "cookies", price: "2.00" };

beforeEach(function() {
  items.push(cookies);
});

afterEach(function() {
    // make sure this *mutates*, not redefines, `items`
    items.length = 0;
  });
  // end afterEach

  describe("GET /list", function() {

    test("Gets a list of shopping items", async function() {
      const resp = await request(app).get(`/list`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        "items": [
          {
            "name": "cookies",
            "price": "2.00"
          }
        ]
      });
    });

    test("gets an item by name", async function(){
      const query="cookies";
      const resp = await request(app).get(`/list/${query}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        "item": {
          "name": "cookies",
          "price": "2.00"
        }
      });
    })
  });

  describe('POST functions', function(){

    test('POST add a new item', async function(){
      const newItem = {"name":"tootsie pops", "price": "1.29"}
      const resp = await request(app).post(`/list`).send(newItem);
      expect(resp.body).toEqual({
        "item": {
          "name": "tootsie pops",
          "price": "1.29"
        }
      })
    })
  });

  describe('PATCH functions', function(){

    test('POST change name of an item', async function(){

      const resp = await request(app).patch(`/list/cookies`).send({name:"candy"});
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        "item": {
          "name": "candy",
          "price": "2.00"
        }
      })
    })
  });
  
  describe('DELETE functions', function(){

    test('DELETE an item', async function(){
      const resp = await request(app).delete(`/list/cookies`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        "message": "Deleted"
      });
    })
  });
