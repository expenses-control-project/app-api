const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "Expenses-control API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000/api/docs",
    },
  ],
};

const outputFile = "./swagger-output.json";

const routes = ["./main.ts"];

swaggerAutogen(outputFile, routes, doc);

module.exports = doc;
