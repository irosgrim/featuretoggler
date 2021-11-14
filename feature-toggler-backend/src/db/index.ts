import { Pool } from "pg";
import sqlite3, { verbose } from 'sqlite3';
import { getFeatureStateById } from "./queries";

const DB_TYPE = process.env.DB_TYPE;

export class SqliteDB {
	query(queryString: string, params?: any[], type?: 'update' | 'insert' | 'delete') {
		const db = new sqlite3.Database(__dirname + '/__DB__/feature_toggler.db', verbose);
		const res: Promise<any> = new Promise((resolve, reject) => {
			if(type && type === 'update' || type === 'insert' || type === 'delete') {
				db.run(queryString, params, (error) => {
					if (error) {
						reject(error);
					} else {
						resolve({rows: ['OK']})
					}
				});
				return;
			}

			db.all(queryString, params, (error, rows) => {
			if (error) {
				reject(error);
			}
			else {
				resolve({rows});
			}
			});
		});
		db.close();
		return res;
	}
}

export class PostgresDB {
	private pool: Pool | null = null;
	constructor() {
		this.pool = new Pool({
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT && parseInt(process.env.DB_PORT, 10) || 5432,
			host: process.env.DB_HOST,
		});
	}

	query(queryString: string, params?: any[], type?: 'update' | 'insert' | 'delete') {
		return this.pool!.query(queryString, params);
	}
}

// export class DBInterface {
// 	query(queryString: string, params?: any[]) {
// 		return pool.query(queryString, params);
// 	}
// }

// const dbInterface = DB_TYPE === 'SQLITE' ? new SqliteDB() : new PostgresDB();
const dbInterface = new PostgresDB();

export default dbInterface;
