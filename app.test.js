process.env.NODE_ENV = "test";

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDB');

let corn = { name: "corn", price: ".55" };

beforeEach(() => {
    items.push(corn);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items on list", async () => {
        const resp = await request(app).get("/items")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([corn])
    })
})

describe("POST /items", () => {
    test("Post new item to list", async () => {
        const beef = { "name": "beef", "price": "12.95" }
        const resp = await request(app)
            .post('/items')
            .send(beef);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ "added": beef })
        expect(items.length).toEqual(2)
    })
})

 describe("PATCH /items", () => {
     test("Patch corn item name and price", async () => {
         const cobCorn = { "name": "cob corn", "price": ".35" }
         const resp = await request(app)
             .patch(`/items/corn`)
             .send(cobCorn);
         expect(resp.statusCode).toBe(200);
         expect(resp.body).toEqual({ 'updated': cobCorn })
     })
 })

describe("DELETE /items", () => {
    test("Delete corn item name and price", async () => {
        const resp = await request(app)
            .delete(`/items/${corn.name}`)
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ 'message': 'Deleted' })
    })
})
