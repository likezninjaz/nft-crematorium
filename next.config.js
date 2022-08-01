const nextEnv = require('next-env');
const dotEnvLoad = require('dotenv-load');

dotEnvLoad();
const withNextEnv = nextEnv();

module.exports = withNextEnv();
