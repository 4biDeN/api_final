const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API FINAL HORUS",
        description: "Documentação final da API"
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

const outputFile = './src/docs/swagger.yaml';
const endpointFiles = ['./src/routes/dept.js', './src/routes/clientes.js', './src/routes/enderecos.js', './src/routes/user.js', './src/routes/agenda.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
