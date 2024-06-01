const swaggerAutogen = require('swagger-autogen')('pt-BR');

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
const endpointFiles = ['./src/routes/dept.js', './src/routes/user.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
