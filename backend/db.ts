const Pool = require("pg").Pool;

const pool = new Pool({
  user: "twchao",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "my_chat_base",
});

module.exports = pool;
