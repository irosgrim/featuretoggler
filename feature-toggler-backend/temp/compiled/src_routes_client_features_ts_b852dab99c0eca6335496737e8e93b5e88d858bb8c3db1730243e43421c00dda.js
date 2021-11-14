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
const express_1 = __importDefault(require("express"));
const featuresRoute = (0, express_1.default)();
featuresRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const db = (_a = req.services) === null || _a === void 0 ? void 0 : _a.db;
    const projectKey = req.projectKey;
    if (req.user) {
        const { email } = req.user;
        if (db) {
            try {
                const projectFeatures = yield db.getProjectForCurrentUserById(email, projectKey);
                if (!projectFeatures || !projectFeatures.length) {
                    res.status(404).send("Project not found!");
                    return;
                }
                res.status(200).send(projectFeatures);
            }
            catch (err) {
                console.log("Error getting project by id: ", err);
            }
        }
    }
    else {
        res.status(401).send("Unauthorized!");
    }
}));
exports.default = featuresRoute;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvcm91dGVzL2NsaWVudC9mZWF0dXJlcy50cyIsInNvdXJjZXMiOlsiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvcm91dGVzL2NsaWVudC9mZWF0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QixNQUFNLGFBQWEsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUVoQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7SUFDekMsTUFBTSxFQUFFLEdBQUcsTUFBQSxHQUFHLENBQUMsUUFBUSwwQ0FBRSxFQUFFLENBQUM7SUFDNUIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNsQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDYixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLEVBQUUsRUFBRTtZQUNQLElBQUk7Z0JBQ0gsTUFBTSxlQUFlLEdBQUcsTUFBTSxFQUFFLENBQUMsNEJBQTRCLENBQUMsS0FBSyxFQUFFLFVBQVcsQ0FBQyxDQUFDO2dCQUNsRixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtvQkFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDM0MsT0FBTztpQkFDUDtnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN0QztZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEQ7U0FDRDtLQUNEO1NBQU07UUFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN0QztBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuY29uc3QgZmVhdHVyZXNSb3V0ZSA9IGV4cHJlc3MoKTtcblxuZmVhdHVyZXNSb3V0ZS5nZXQoXCIvXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuXHRjb25zdCBkYiA9IHJlcS5zZXJ2aWNlcz8uZGI7XG5cdGNvbnN0IHByb2plY3RLZXkgPSByZXEucHJvamVjdEtleTtcblx0aWYgKHJlcS51c2VyKSB7XG5cdFx0Y29uc3QgeyBlbWFpbCB9ID0gcmVxLnVzZXI7XG5cdFx0aWYgKGRiKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBwcm9qZWN0RmVhdHVyZXMgPSBhd2FpdCBkYi5nZXRQcm9qZWN0Rm9yQ3VycmVudFVzZXJCeUlkKGVtYWlsLCBwcm9qZWN0S2V5ISk7XG5cdFx0XHRcdGlmICghcHJvamVjdEZlYXR1cmVzIHx8ICFwcm9qZWN0RmVhdHVyZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmVzLnN0YXR1cyg0MDQpLnNlbmQoXCJQcm9qZWN0IG5vdCBmb3VuZCFcIik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlcy5zdGF0dXMoMjAwKS5zZW5kKHByb2plY3RGZWF0dXJlcyk7XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJFcnJvciBnZXR0aW5nIHByb2plY3QgYnkgaWQ6IFwiLCBlcnIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMuc3RhdHVzKDQwMSkuc2VuZChcIlVuYXV0aG9yaXplZCFcIik7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlc1JvdXRlO1xuIl19