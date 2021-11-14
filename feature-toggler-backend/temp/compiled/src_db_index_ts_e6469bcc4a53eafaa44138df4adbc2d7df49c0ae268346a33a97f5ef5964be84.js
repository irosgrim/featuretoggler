"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDB = exports.SqliteDB = void 0;
const pg_1 = require("pg");
const sqlite3_1 = __importStar(require("sqlite3"));
const DB_TYPE = process.env.DB_TYPE;
class SqliteDB {
    query(queryString, params, type) {
        const db = new sqlite3_1.default.Database(__dirname + '/__DB__/feature_toggler.db', sqlite3_1.verbose);
        const res = new Promise((resolve, reject) => {
            if (type && type === 'update' || type === 'insert' || type === 'delete') {
                db.run(queryString, params, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({ rows: ['OK'] });
                    }
                });
                return;
            }
            db.all(queryString, params, (error, rows) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve({ rows });
                }
            });
        });
        db.close();
        return res;
    }
}
exports.SqliteDB = SqliteDB;
class PostgresDB {
    constructor() {
        this.pool = null;
        this.pool = new pg_1.Pool({
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT && parseInt(process.env.DB_PORT, 10) || 5432,
            host: process.env.DB_HOST,
        });
    }
    query(queryString, params, type) {
        return this.pool.query(queryString, params);
    }
}
exports.PostgresDB = PostgresDB;
// export class DBInterface {
// 	query(queryString: string, params?: any[]) {
// 		return pool.query(queryString, params);
// 	}
// }
// const dbInterface = DB_TYPE === 'SQLITE' ? new SqliteDB() : new PostgresDB();
const dbInterface = new PostgresDB();
exports.default = dbInterface;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvZGIvaW5kZXgudHMiLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2lvcm9zL0RvY3VtZW50cy9wbGF5Z3JvdW5kL2RvY2tlci1zZXJ2aWNlcy9mZWF0dXJlLXRvZ2dsZXIvZmVhdHVyZS10b2dnbGVyLWJhY2tlbmQvc3JjL2RiL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBMEI7QUFDMUIsbURBQTJDO0FBRzNDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBRXBDLE1BQWEsUUFBUTtJQUNwQixLQUFLLENBQUMsV0FBbUIsRUFBRSxNQUFjLEVBQUUsSUFBcUM7UUFDL0UsTUFBTSxFQUFFLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxDQUFDO1FBQ25GLE1BQU0sR0FBRyxHQUFpQixJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6RCxJQUFHLElBQUksSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDdkUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3JDLElBQUksS0FBSyxFQUFFO3dCQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDZDt5QkFBTTt3QkFDTixPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUE7cUJBQ3ZCO2dCQUNGLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDUDtZQUVELEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDNUMsSUFBSSxLQUFLLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNkO3FCQUNJO29CQUNKLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ2hCO1lBQ0QsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNYLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztDQUNEO0FBM0JELDRCQTJCQztBQUVELE1BQWEsVUFBVTtJQUV0QjtRQURRLFNBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFJLENBQUM7WUFDcEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztZQUM3QixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7WUFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJO1lBQ3RFLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFtQixFQUFFLE1BQWMsRUFBRSxJQUFxQztRQUMvRSxPQUFPLElBQUksQ0FBQyxJQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Q7QUFmRCxnQ0FlQztBQUVELDZCQUE2QjtBQUM3QixnREFBZ0Q7QUFDaEQsNENBQTRDO0FBQzVDLEtBQUs7QUFDTCxJQUFJO0FBRUosZ0ZBQWdGO0FBQ2hGLE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFckMsa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9vbCB9IGZyb20gXCJwZ1wiO1xuaW1wb3J0IHNxbGl0ZTMsIHsgdmVyYm9zZSB9IGZyb20gJ3NxbGl0ZTMnO1xuaW1wb3J0IHsgZ2V0RmVhdHVyZVN0YXRlQnlJZCB9IGZyb20gXCIuL3F1ZXJpZXNcIjtcblxuY29uc3QgREJfVFlQRSA9IHByb2Nlc3MuZW52LkRCX1RZUEU7XG5cbmV4cG9ydCBjbGFzcyBTcWxpdGVEQiB7XG5cdHF1ZXJ5KHF1ZXJ5U3RyaW5nOiBzdHJpbmcsIHBhcmFtcz86IGFueVtdLCB0eXBlPzogJ3VwZGF0ZScgfCAnaW5zZXJ0JyB8ICdkZWxldGUnKSB7XG5cdFx0Y29uc3QgZGIgPSBuZXcgc3FsaXRlMy5EYXRhYmFzZShfX2Rpcm5hbWUgKyAnL19fREJfXy9mZWF0dXJlX3RvZ2dsZXIuZGInLCB2ZXJib3NlKTtcblx0XHRjb25zdCByZXM6IFByb21pc2U8YW55PiA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGlmKHR5cGUgJiYgdHlwZSA9PT0gJ3VwZGF0ZScgfHwgdHlwZSA9PT0gJ2luc2VydCcgfHwgdHlwZSA9PT0gJ2RlbGV0ZScpIHtcblx0XHRcdFx0ZGIucnVuKHF1ZXJ5U3RyaW5nLCBwYXJhbXMsIChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh7cm93czogWydPSyddfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGRiLmFsbChxdWVyeVN0cmluZywgcGFyYW1zLCAoZXJyb3IsIHJvd3MpID0+IHtcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJlc29sdmUoe3Jvd3N9KTtcblx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGRiLmNsb3NlKCk7XG5cdFx0cmV0dXJuIHJlcztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgUG9zdGdyZXNEQiB7XG5cdHByaXZhdGUgcG9vbDogUG9vbCB8IG51bGwgPSBudWxsO1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnBvb2wgPSBuZXcgUG9vbCh7XG5cdFx0XHRkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfTkFNRSxcblx0XHRcdHVzZXI6IHByb2Nlc3MuZW52LkRCX1VTRVJOQU1FLFxuXHRcdFx0cGFzc3dvcmQ6IHByb2Nlc3MuZW52LkRCX1BBU1NXT1JELFxuXHRcdFx0cG9ydDogcHJvY2Vzcy5lbnYuREJfUE9SVCAmJiBwYXJzZUludChwcm9jZXNzLmVudi5EQl9QT1JULCAxMCkgfHwgNTQzMixcblx0XHRcdGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QsXG5cdFx0fSk7XG5cdH1cblxuXHRxdWVyeShxdWVyeVN0cmluZzogc3RyaW5nLCBwYXJhbXM/OiBhbnlbXSwgdHlwZT86ICd1cGRhdGUnIHwgJ2luc2VydCcgfCAnZGVsZXRlJykge1xuXHRcdHJldHVybiB0aGlzLnBvb2whLnF1ZXJ5KHF1ZXJ5U3RyaW5nLCBwYXJhbXMpO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBEQkludGVyZmFjZSB7XG4vLyBcdHF1ZXJ5KHF1ZXJ5U3RyaW5nOiBzdHJpbmcsIHBhcmFtcz86IGFueVtdKSB7XG4vLyBcdFx0cmV0dXJuIHBvb2wucXVlcnkocXVlcnlTdHJpbmcsIHBhcmFtcyk7XG4vLyBcdH1cbi8vIH1cblxuLy8gY29uc3QgZGJJbnRlcmZhY2UgPSBEQl9UWVBFID09PSAnU1FMSVRFJyA/IG5ldyBTcWxpdGVEQigpIDogbmV3IFBvc3RncmVzREIoKTtcbmNvbnN0IGRiSW50ZXJmYWNlID0gbmV3IFBvc3RncmVzREIoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGJJbnRlcmZhY2U7XG4iXX0=