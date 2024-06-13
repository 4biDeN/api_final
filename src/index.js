const express = require('express');
const app = express();

const port = 3000;
require('./services/swagger');

app.use(express.json());
require('./routes')(app);

app.get('/', (req, res) => {res.send('teste'); });

app.use('/v1/docs', express.static('src/views'))
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'))


app.listen (port, () => {
    console.log(`Aplicação Rodando na porta ${port}`);
});