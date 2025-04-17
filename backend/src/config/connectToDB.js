const sql = require('mssql');

const dotenv = require('dotenv');

dotenv.config();

// Define the connection configuration
const config = {
  server: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    instanceName: process.env.DB_INSTANCE, // Use this for named instances
  },
  port: process.env.DB_PORT,
};

// Database connection pool
const poolPromise = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('SQL Server connection failed', error);
    process.exit(1);
  }
};

module.exports = { sql, poolPromise };