"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const api_1 = require("../db/api");
const services = {
    db: new api_1.DatabaseApi(db_1.default),
};
const exposeServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.services = services;
    next();
});
exports.default = exposeServices;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvbWlkZGxld2FyZXMvc2VydmljZXMudHMiLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2lvcm9zL0RvY3VtZW50cy9wbGF5Z3JvdW5kL2RvY2tlci1zZXJ2aWNlcy9mZWF0dXJlLXRvZ2dsZXIvZmVhdHVyZS10b2dnbGVyLWJhY2tlbmQvc3JjL21pZGRsZXdhcmVzL3NlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQWdDO0FBQ2hDLG1DQUF3QztBQUV4QyxNQUFNLFFBQVEsR0FBRztJQUNoQixFQUFFLEVBQUUsSUFBSSxpQkFBVyxDQUFDLFlBQVcsQ0FBQztDQUNoQyxDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNoRixHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUN4QixJQUFJLEVBQUUsQ0FBQztBQUNSLENBQUMsQ0FBQSxDQUFDO0FBRUYsa0JBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgZGJJbnRlcmZhY2UgZnJvbSBcIi4uL2RiXCI7XG5pbXBvcnQgeyBEYXRhYmFzZUFwaSB9IGZyb20gXCIuLi9kYi9hcGlcIjtcblxuY29uc3Qgc2VydmljZXMgPSB7XG5cdGRiOiBuZXcgRGF0YWJhc2VBcGkoZGJJbnRlcmZhY2UpLFxufTtcblxuY29uc3QgZXhwb3NlU2VydmljZXMgPSBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcblx0cmVxLnNlcnZpY2VzID0gc2VydmljZXM7XG5cdG5leHQoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGV4cG9zZVNlcnZpY2VzOyJdfQ==