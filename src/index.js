const express = require('express');
const cors = require('cors');
const apiRouter =  require('./routes');

const app = express();

app.use(express.json())
app.use(cors())
app.use(apiRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`app started on port ${PORT}`))