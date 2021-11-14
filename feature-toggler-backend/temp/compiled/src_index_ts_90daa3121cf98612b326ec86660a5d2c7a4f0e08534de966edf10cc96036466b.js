"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = __importDefault(require("./server"));
const app = (0, server_1.default)();
const PORT = 3010;
app.listen(PORT, () => console.log("SERVER IS ON!"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvaW5kZXgudHMiLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2lvcm9zL0RvY3VtZW50cy9wbGF5Z3JvdW5kL2RvY2tlci1zZXJ2aWNlcy9mZWF0dXJlLXRvZ2dsZXIvZmVhdHVyZS10b2dnbGVyLWJhY2tlbmQvc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUJBQXVCO0FBQ3ZCLHNEQUE4QjtBQUU5QixNQUFNLEdBQUcsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJztcbmltcG9ydCBzZXJ2ZXIgZnJvbSBcIi4vc2VydmVyXCI7XG5cbmNvbnN0IGFwcCA9IHNlcnZlcigpO1xuY29uc3QgUE9SVCA9IDMwMTA7XG5cbmFwcC5saXN0ZW4oUE9SVCwgKCkgPT4gY29uc29sZS5sb2coXCJTRVJWRVIgSVMgT04hXCIpKTtcbiJdfQ==