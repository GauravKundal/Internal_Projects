import { createConnection } from 'mysql2/promise';

export let conn;

export async function connectDb() {
  if (conn) return conn; // reuse connection
  try {
    conn = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Gaurav@123',
      port: 3306,
      database: 'bookmystay',
    });
    console.log('✅ DB connection created');
    return conn;
  } catch (error) {
    console.log('❌ Error in DB connection');
    console.log(error);
  }
}
