
const request = require("supertest");
const app = require("../server");

describe("GET /files", () => {
    test("should return status 200", async () => {
        const response = await request(app).get("/files");

        expect(response.status).toBe(200);
    });
});
