"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const services_1 = __importDefault(require("./middlewares/services"));
const features_1 = __importDefault(require("./routes/client/features"));
const featuresAndProjects_1 = __importDefault(require("./routes/dashboard/featuresAndProjects"));
const checkFtKey_1 = __importDefault(require("./middlewares/checkFtKey"));
const server = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use("/api/projects", auth_1.default, services_1.default, featuresAndProjects_1.default);
    app.use("/features", auth_1.default, checkFtKey_1.default, services_1.default, features_1.default);
    return app;
};
exports.default = server;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvc2VydmVyLnRzIiwic291cmNlcyI6WyJDOi9Vc2Vycy9pb3Jvcy9Eb2N1bWVudHMvcGxheWdyb3VuZC9kb2NrZXItc2VydmljZXMvZmVhdHVyZS10b2dnbGVyL2ZlYXR1cmUtdG9nZ2xlci1iYWNrZW5kL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsZ0RBQXdCO0FBQ3hCLDhEQUFvRDtBQUNwRCxzRUFBb0Q7QUFDcEQsd0VBQWdEO0FBQ2hELGlHQUF5RTtBQUN6RSwwRUFBa0Q7QUFFbEQsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLGNBQWtCLEVBQUUsa0JBQWMsRUFBRSw2QkFBbUIsQ0FBQyxDQUFBO0lBQ2pGLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGNBQWtCLEVBQUUsb0JBQVUsRUFBRSxrQkFBYyxFQUFFLGtCQUFRLENBQUMsQ0FBQztJQUMvRSxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCBjaGVja0F1dGhvcml6YXRpb24gZnJvbSBcIi4vbWlkZGxld2FyZXMvYXV0aFwiO1xuaW1wb3J0IGV4cG9zZVNlcnZpY2VzIGZyb20gXCIuL21pZGRsZXdhcmVzL3NlcnZpY2VzXCI7XG5pbXBvcnQgZmVhdHVyZXMgZnJvbSBcIi4vcm91dGVzL2NsaWVudC9mZWF0dXJlc1wiO1xuaW1wb3J0IGZlYXR1cmVzQW5kUHJvamVjdHMgZnJvbSBcIi4vcm91dGVzL2Rhc2hib2FyZC9mZWF0dXJlc0FuZFByb2plY3RzXCI7XG5pbXBvcnQgY2hlY2tGdEtleSBmcm9tIFwiLi9taWRkbGV3YXJlcy9jaGVja0Z0S2V5XCI7XG5cbmNvbnN0IHNlcnZlciA9ICgpID0+IHtcblx0Y29uc3QgYXBwID0gZXhwcmVzcygpO1xuXHRhcHAudXNlKGNvcnMoKSk7XG5cdGFwcC51c2UoXCIvYXBpL3Byb2plY3RzXCIsIGNoZWNrQXV0aG9yaXphdGlvbiwgZXhwb3NlU2VydmljZXMsIGZlYXR1cmVzQW5kUHJvamVjdHMpXG5cdGFwcC51c2UoXCIvZmVhdHVyZXNcIiwgY2hlY2tBdXRob3JpemF0aW9uLCBjaGVja0Z0S2V5LCBleHBvc2VTZXJ2aWNlcywgZmVhdHVyZXMpO1xuXHRyZXR1cm4gYXBwO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyO1xuIl19