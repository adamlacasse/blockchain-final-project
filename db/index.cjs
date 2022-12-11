const pg = require('pg');
const dbConfig = require('./dbConfig.cjs');

pg.types.setTypeParser(20, 'text', parseInt);
const pool = new pg.Pool(dbConfig);

module.exports = {
  query: async (text, params, callback) => {
    const response = await pool.query(text, params, callback);
    return response;
  },
  dbConfig
};
