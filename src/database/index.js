import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const connect = mysql.createPool(
  {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);

connect.getConnection(async (err, conn) => {
  try {
    conn.release();
  } catch (err) {
    err ? console.error(err) : console.log("db connect");
  } 
});

const database = connect.promise();

export default database;
