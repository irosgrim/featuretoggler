import supertest from "supertest";
import exposeServices from "../middlewares/services";
import server from "../server";

jest.mock("../middlewares/auth", () => jest.fn((req, res, next) => {
	req.projectKey = 'ion-api-key';
	req.user = {
		name: "supertest",
		username: "ion",
		email: "ion@gmail.com",
	};
	next();
}));

jest.mock("../middlewares/services", () => jest.fn((req, res, next) => {
	req.services = {
		db: {
			getAllProjectsForCurrentUser: function (email: string) {
				return [];
			},
			getProjectForCurrentUserById: function (email: string, projectId: string) {
				if(projectId = req.projectKey) {
					return [{name: 'supertest'}];
				}
				return;
			},
		}
	}
	next();
}))

describe("Features: get /features", () => {
	it("should return status code when authorized", async () => {
		const app = server();
		const request = supertest.agent(app);
		const req = await request.get("/features");
		expect(req.statusCode).toBe(200);
	});
});
