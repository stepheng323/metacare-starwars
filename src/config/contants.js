const dotenv = require('dotenv');

dotenv.config();


const {
    DEV_DATABASE_URL,
    TEST_DATABASE_URL,
    PROD_DATABASE_URL,
    NODE_ENV
} = process.env


module.exports = {
    DEV_DATABASE_URL,
    TEST_DATABASE_URL,
    PROD_DATABASE_URL,
    NODE_ENV
}