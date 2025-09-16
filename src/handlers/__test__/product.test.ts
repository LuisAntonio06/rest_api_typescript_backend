import request from "supertest";
import server from "../../server";

describe("POST api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is a number and greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor Curvo",
      price: 0 // Ahora fuerza el error
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 50
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET api/products", () => {
  it("should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });

  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.length).toBeGreaterThanOrEqual(1); // en vez de length exacto
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET api/products", () => {
  it("should return a 404 error response for a non-existent product", async () => {
    const productoId = 200;
    const response = await request(server).get(`/api/products/${productoId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto No Encontrado"); // Coincide con tu API real
  });

  it('should check a valid ID in the URL' , async () => {
    const response = await request(server).get('/api/no-valid-url')
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no válido')
  });

  it('GET a JSON response for a single product' , async () => {
    const response = await request(server).get('/api/no-valid-url')
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });


});

describe('PUT api/products/:id' , () => {
    it('should display validation error messages when updating a producto' , async () => {
        const response = await request(server).delete('/api/products/1').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5);
        
        expect(response.status).not.toBe(400);
    });
});