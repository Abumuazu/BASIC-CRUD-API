const app = require('../app');
const request= require("supertest")
database= require("/Users/e/Desktop/week-6-node-008-Abumuazu/lib/database.json")

describe("Test for GET method", () => {
    test("should get all the users", async () => {
        const result = await request(app).get('/users')
        expect(result.status).toBe(200)
    })
    test("sshould shout eroror for inValid path", async () => {
        const result = await request(app).get('/users/dd')
        expect(result.status).toBe(404)
    })
    test("should get user by specific ID ", async () => {
        const id = database.find((x:users) => x.id === 7)
        const user = await request (app).get('/users/7')
    })
    test("testing for Body content ", async () => {
        const id = database.find((x:users) => x.id === 7)
        const user = await request (app).get('/users/7')
        id
     ?  expect(user.body).toEqual(id)
     :  expect(user.body).toBe("Not found ")
    })
})

// Test cases for post Method 

describe("Post Method Testing", () => {
    test("it should return a status code of 404 error for invalid Path",async () => {
        const user = await request(app).post("/usering");
        expect(user.status).toBe(404);
    });
    test("it should return a status code of 200 when the user inputs a valid path", async () => {
        const user = await request(app).post("/users")
        expect(user.status).toBe(200)
    })
    test("it should return tthe content of what was just posted to the database", async () => {
        const user = await request(app).post("/users").send({
            "organization": "node ninja",
            "products": [
              "developers",
              "pizza"
            ],
            "marketValue": "90%",
            "address": "sangotedo",
            "ceo": "ChangeMuazu",
            "country": "Taiwan",
            "noOfEmployees": 2,
            "employees": [
              "james bond",
              "jackie chan"
            ]
        })
        const userIndex = database.fond((x:users) => x.id === 6);
        expect(user.body).toEqual([database[database.length-1]])
    })
})

// Test case for put Method 
describe("PUT/UPDATE Method test cases",  async () => {
    test("it should send a status code of 404 for invalid path", async () => {
        const user = await request(app).patch("/users/mzee")
        expect(user.status).toEqual(404)
    })
    test("it should send a status code of 200 for valid path", async () => {
        const userIndex = database.find((x:users) =>x.id === 5);
        const user = await request(app).patch("/users/5");
        if(!userIndex) {
            expect(user.status).toBe(404);
        }else {
            expect(user.status).toBe(200);
        }
    })
    test("it should update the user info with the required ID", async () => {
        const userIndex= database.find((x:users) => x.id === 3);
        const user = await request(app).patch("/users/3").send({
            "organization": "node ninja",
            "products": [
              "developers",
              "pizza"
            ],
            "marketValue": "90%",
            "address": "sangotedo",
            "ceo": "ChangeMuazu",
            "country": "Taiwan",
            "noOfEmployees": 2,
            "employees": [
              "james bond",
              "jackie chan"
            ]
        })
        if(!userIndex) {
            expect(user.status).toBe(404)
        }else {
            expect(userIndex).toHaveProperty("organization", "node ninja")
        }
    })
})

//delete test cases 
describe("Test cases for DELETE Method", () => {
    test("it should send an status code of 404 for invalid path", async () =>{
        const user = await request(app).delete("/users/kolo");
        expect(user.status).toBe(404);
    })
    test("it should send a status code of 200 for a valid path", async() => {
        const userIndex = database.find((x:users) => x.id === 4);
        const user = await request (app).delete("/users/4");
        if (!userIndex) {
            expect(user.status).toBe(404)
        }else {
            expect(user.status).toBe(404)
        }
    })
    test('it should send a text weather or not the user has been deleted', async () => {
        const userIndex = database.find((x:users) => x.id === 7);
        const user = await request (app).delete("/users/7")
        if(!userIndex ){
            expect(user.text).toBe("oorganization with the id ${id} was not found")
        } else {
            expect(user.text).toBe("organization  with the  has been deleted from the database")
        }
    })
})
