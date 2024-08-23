const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "Expenses-control API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3002/api/v1",
    },
  ],
};

const outputFile = "./json/swagger-output.json";

const routes = ["./shared/rutas_compuestas.ts"];

swaggerAutogen(outputFile, routes, doc);

module.exports = doc;
