const express = require('express');
const cors = require('cors');
const apiRouter =  require('./routes');
const { respondWithSuccess } = require('./helpers/responseHandler');
const { PORT } = require('./config/contants')


const app = express();

app.use(express.json())
app.use(cors())
app.use(apiRouter);
app.get('/', (req, res) => respondWithSuccess(res, 200, 'Welcome to star wars api'));



app.listen(PORT, () => console.log(`app started on port ${PORT}`))