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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseApi = void 0;
const uuid_1 = require("uuid");
const queries_1 = require("./queries");
class DatabaseApi {
    constructor(dbInterface) {
        this.dbInterface = dbInterface;
    }
    getAllProjectsForUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield this.dbInterface.query(queries_1.selectAllProjectsForUser, [email]);
                return rows;
            }
            catch (err) {
                console.log("getAllProjectsForCurrentUser error: ", err);
            }
        });
    }
    newProject(email, projectName, active, isAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ active, isAdmin });
                const projectId = (0, uuid_1.v4)();
                const getOrganizationId = `
				SELECT organization_id FROM users
				WHERE email=$1;
			`;
                const getSpecificProjectFromOrganization = `
				SELECT project_name FROM projects
				WHERE organization_id=$1 AND project_name=$2;
			`;
                const { rows: organizationId } = yield this.dbInterface.query(getOrganizationId, [email]);
                const { rows: specificProject } = yield this.dbInterface.query(getSpecificProjectFromOrganization, [organizationId[0].organization_id, projectName]);
                if (specificProject.length) {
                    return -1;
                }
                const newProject = yield this.dbInterface.query(queries_1.newProjectForUser, [projectId, projectName, active, organizationId[0].organization_id]);
                const newProjectPermissionsForUser = yield this.dbInterface.query(queries_1.newUserProjectPermissions, [projectId, email, isAdmin]);
                const { rows } = yield this.dbInterface.query(queries_1.selectProjectForUser, [email, projectId]);
                return rows;
            }
            catch (err) {
                console.log("newProject error: ", err);
            }
        });
    }
    getAllFeaturesForCurrentUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rows } = yield this.dbInterface.query(queries_1.selectAllFeaturesForUser, [email]);
                return rows;
            }
            catch (err) {
                console.log("getAllFeaturesForCurrentUser error: ", err);
            }
        });
    }
    getProjectForCurrentUserById(email, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    updateFeature(projectId, featureName, featureEnabled) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.dbInterface.query(queries_1.toggleFeature, [featureEnabled, projectId, featureName]);
            return rows[0];
        });
    }
    getFeatureStateById(projectId, featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.dbInterface.query(queries_1.getFeatureStateById, [projectId, featureName]);
            return rows[0];
        });
    }
    deleteFeatureById(projectId, featureName) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.dbInterface.query(queries_1.deleteFeatureById, [projectId, featureName], 'delete');
            return rows[0];
        });
    }
    newFeature(email, projectId, name, value, description, enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const { rows: userBelongsToProject } = yield this.dbInterface.query(queries_1.getUserPermissionsForProject, [projectId, email]);
            if (userBelongsToProject.length > 0) {
                const { rows: allFeatureForCurrentProject } = yield this.dbInterface.query(queries_1.selectAllFeaturesFromProject, [email, projectId]);
                const featureExists = allFeatureForCurrentProject.find((f) => f.feature_name === name);
                if (!featureExists) {
                    const { rows } = yield this.dbInterface.query(queries_1.newFeature, [projectId, name, value, enabled, description]);
                    return rows[0];
                }
            }
        });
    }
    deleteProject(projectId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows: currentProjectUserPermissions } = yield this.dbInterface.query(queries_1.getUserPermissionsForProject, [projectId, email]);
            if (currentProjectUserPermissions.length && currentProjectUserPermissions[0].is_admin) {
                try {
                    const { rows: projectToDelete } = yield this.dbInterface.query(queries_1.selectProjectForUser, [email, projectId]);
                    const deleteUserProjectPermission = yield this.dbInterface.query(queries_1.deleteAllPermissionsForProject, [projectId]);
                    const deleteAllFeaturesForProject = yield this.dbInterface.query(queries_1.deleteAllFeaturesThatBelongToProject, [projectId]);
                    const deleteProjectById = yield this.dbInterface.query(queries_1.deleteProject, [projectId], 'update');
                    return projectToDelete[0];
                }
                catch (err) {
                    throw err;
                }
            }
        });
    }
}
exports.DatabaseApi = DatabaseApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvZGIvYXBpLnRzIiwic291cmNlcyI6WyJDOi9Vc2Vycy9pb3Jvcy9Eb2N1bWVudHMvcGxheWdyb3VuZC9kb2NrZXItc2VydmljZXMvZmVhdHVyZS10b2dnbGVyL2ZlYXR1cmUtdG9nZ2xlci1iYWNrZW5kL3NyYy9kYi9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsK0JBQW9DO0FBQ3BDLHVDQUF1VztBQUV2VyxNQUFhLFdBQVc7SUFFdkIsWUFBWSxXQUFnQjtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNoQyxDQUFDO0lBQ0sscUJBQXFCLENBQUMsS0FBYTs7WUFDeEMsSUFBSTtnQkFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQyxrQ0FBd0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLE9BQU8sSUFBSSxDQUFDO2FBQ1o7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3pEO1FBQ0YsQ0FBQztLQUFBO0lBQ0ssVUFBVSxDQUFDLEtBQWEsRUFBRSxXQUFtQixFQUFFLE1BQWUsRUFBRSxPQUFnQjs7WUFDckYsSUFBSTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUEsU0FBTSxHQUFFLENBQUM7Z0JBQzNCLE1BQU0saUJBQWlCLEdBQUc7OztJQUd6QixDQUFDO2dCQUNGLE1BQU0sa0NBQWtDLEdBQUc7OztJQUcxQyxDQUFDO2dCQUNGLE1BQU0sRUFB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UUFBUSxFQUFFO2dCQUNyRixJQUFJO29CQUNILE1BQU0sRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyw4QkFBb0IsRUFBRSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN2RyxNQUFNLDJCQUEyQixHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsd0NBQThCLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM5RyxNQUFNLDJCQUEyQixHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsOENBQW9DLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNwSCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsdUJBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM3RixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUI7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ2IsTUFBTSxHQUFHLENBQUM7aUJBQ1Y7YUFDRDtRQUNGLENBQUM7S0FBQTtDQUVEO0FBOUZELGtDQThGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNxbGl0ZURCLCBQb3N0Z3Jlc0RCIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgZGVsZXRlQWxsRmVhdHVyZXNUaGF0QmVsb25nVG9Qcm9qZWN0LCBkZWxldGVBbGxQZXJtaXNzaW9uc0ZvclByb2plY3QsIGRlbGV0ZUZlYXR1cmVCeUlkLCBkZWxldGVQcm9qZWN0LCBnZXRGZWF0dXJlU3RhdGVCeUlkLCBnZXRVc2VyUGVybWlzc2lvbnNGb3JQcm9qZWN0LCBuZXdGZWF0dXJlLCBuZXdQcm9qZWN0Rm9yVXNlciwgbmV3VXNlclByb2plY3RQZXJtaXNzaW9ucywgc2VsZWN0QWxsRmVhdHVyZXNGb3JVc2VyLCBzZWxlY3RBbGxGZWF0dXJlc0Zyb21Qcm9qZWN0LCBzZWxlY3RBbGxQcm9qZWN0c0ZvclVzZXIsIHNlbGVjdFByb2plY3RGb3JVc2VyLCB0b2dnbGVGZWF0dXJlIH0gZnJvbSBcIi4vcXVlcmllc1wiO1xuXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VBcGkge1xuXHRwcml2YXRlIGRiSW50ZXJmYWNlOiBQb3N0Z3Jlc0RCIHwgU3FsaXRlREI7XG5cdGNvbnN0cnVjdG9yKGRiSW50ZXJmYWNlOiBhbnkpIHtcblx0XHR0aGlzLmRiSW50ZXJmYWNlID0gZGJJbnRlcmZhY2U7XG5cdH1cblx0YXN5bmMgZ2V0QWxsUHJvamVjdHNGb3JVc2VyKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQgfCBhbnlbXT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UhLnF1ZXJ5KHNlbGVjdEFsbFByb2plY3RzRm9yVXNlciwgW2VtYWlsXSk7XG5cdFx0XHRyZXR1cm4gcm93cztcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiZ2V0QWxsUHJvamVjdHNGb3JDdXJyZW50VXNlciBlcnJvcjogXCIsIGVycik7XG5cdFx0fVxuXHR9XG5cdGFzeW5jIG5ld1Byb2plY3QoZW1haWw6IHN0cmluZywgcHJvamVjdE5hbWU6IHN0cmluZywgYWN0aXZlOiBib29sZWFuLCBpc0FkbWluOiBib29sZWFuKTogUHJvbWlzZTxhbnk+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc29sZS5sb2coe2FjdGl2ZSwgaXNBZG1pbn0pO1xuXHRcdFx0Y29uc3QgcHJvamVjdElkID0gdXVpZHY0KCk7XG5cdFx0XHRjb25zdCBnZXRPcmdhbml6YXRpb25JZCA9IGBcblx0XHRcdFx0U0VMRUNUIG9yZ2FuaXphdGlvbl9pZCBGUk9NIHVzZXJzXG5cdFx0XHRcdFdIRVJFIGVtYWlsPSQxO1xuXHRcdFx0YDtcblx0XHRcdGNvbnN0IGdldFNwZWNpZmljUHJvamVjdEZyb21Pcmdhbml6YXRpb24gPSBgXG5cdFx0XHRcdFNFTEVDVCBwcm9qZWN0X25hbWUgRlJPTSBwcm9qZWN0c1xuXHRcdFx0XHRXSEVSRSBvcmdhbml6YXRpb25faWQ9JDEgQU5EIHByb2plY3RfbmFtZT0kMjtcblx0XHRcdGA7XG5cdFx0XHRjb25zdCB7cm93czogb3JnYW5pemF0aW9uSWR9ID0gYXdhaXQgdGhpcy5kYkludGVyZmFjZS5xdWVyeShnZXRPcmdhbml6YXRpb25JZCwgW2VtYWlsXSk7XG5cdFx0XHRjb25zdCB7cm93czogc3BlY2lmaWNQcm9qZWN0fSA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UucXVlcnkoZ2V0U3BlY2lmaWNQcm9qZWN0RnJvbU9yZ2FuaXphdGlvbiwgW29yZ2FuaXphdGlvbklkWzBdLm9yZ2FuaXphdGlvbl9pZCwgcHJvamVjdE5hbWVdKTtcblx0XHRcdGlmKHNwZWNpZmljUHJvamVjdC5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgbmV3UHJvamVjdCA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UhLnF1ZXJ5KG5ld1Byb2plY3RGb3JVc2VyLCBbcHJvamVjdElkLCBwcm9qZWN0TmFtZSwgYWN0aXZlLCBvcmdhbml6YXRpb25JZFswXS5vcmdhbml6YXRpb25faWRdKTtcblx0XHRcdGNvbnN0IG5ld1Byb2plY3RQZXJtaXNzaW9uc0ZvclVzZXIgPSBhd2FpdCB0aGlzLmRiSW50ZXJmYWNlIS5xdWVyeShuZXdVc2VyUHJvamVjdFBlcm1pc3Npb25zLCBbcHJvamVjdElkLCBlbWFpbCwgaXNBZG1pbl0pO1xuXHRcdFx0Y29uc3QgeyByb3dzIH0gPSBhd2FpdCB0aGlzLmRiSW50ZXJmYWNlIS5xdWVyeShzZWxlY3RQcm9qZWN0Rm9yVXNlciwgW2VtYWlsLCBwcm9qZWN0SWRdKTtcblx0XHRcdHJldHVybiByb3dzO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Y29uc29sZS5sb2coXCJuZXdQcm9qZWN0IGVycm9yOiBcIiwgZXJyKTtcblx0XHR9XG5cdH1cblx0YXN5bmMgZ2V0QWxsRmVhdHVyZXNGb3JDdXJyZW50VXNlcihlbWFpbDogc3RyaW5nKTogUHJvbWlzZTx2b2lkIHwgYW55W10+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgeyByb3dzIH0gPSBhd2FpdCB0aGlzLmRiSW50ZXJmYWNlIS5xdWVyeShzZWxlY3RBbGxGZWF0dXJlc0ZvclVzZXIsIFtlbWFpbF0pO1xuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImdldEFsbEZlYXR1cmVzRm9yQ3VycmVudFVzZXIgZXJyb3I6IFwiLCBlcnIpO1xuXHRcdH1cblx0fVxuXHRhc3luYyBnZXRQcm9qZWN0Rm9yQ3VycmVudFVzZXJCeUlkKGVtYWlsOiBzdHJpbmcsIHByb2plY3RJZDogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlRmVhdHVyZShwcm9qZWN0SWQ6IHN0cmluZywgZmVhdHVyZU5hbWU6IHN0cmluZywgZmVhdHVyZUVuYWJsZWQ6IGJvb2xlYW4pIHtcblx0XHRjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UhLnF1ZXJ5KHRvZ2dsZUZlYXR1cmUsIFtmZWF0dXJlRW5hYmxlZCwgcHJvamVjdElkLCBmZWF0dXJlTmFtZV0pO1xuXHRcdHJldHVybiByb3dzWzBdO1xuXHR9XG5cblx0YXN5bmMgZ2V0RmVhdHVyZVN0YXRlQnlJZChwcm9qZWN0SWQ6IHN0cmluZywgZmVhdHVyZU5hbWU6IHN0cmluZykge1xuXHRcdGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgdGhpcy5kYkludGVyZmFjZSEucXVlcnkoZ2V0RmVhdHVyZVN0YXRlQnlJZCwgW3Byb2plY3RJZCwgZmVhdHVyZU5hbWVdKTtcblx0XHRyZXR1cm4gcm93c1swXTtcblx0fVxuXG5cdGFzeW5jIGRlbGV0ZUZlYXR1cmVCeUlkKHByb2plY3RJZDogc3RyaW5nLCBmZWF0dXJlTmFtZTogc3RyaW5nKSB7XG5cdFx0Y29uc3QgeyByb3dzIH0gPSBhd2FpdCB0aGlzLmRiSW50ZXJmYWNlIS5xdWVyeShkZWxldGVGZWF0dXJlQnlJZCwgW3Byb2plY3RJZCwgZmVhdHVyZU5hbWVdLCAnZGVsZXRlJyk7XG5cdFx0cmV0dXJuIHJvd3NbMF07XG5cdH1cblxuXHRhc3luYyBuZXdGZWF0dXJlKGVtYWlsOiBzdHJpbmcsIHByb2plY3RJZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIGVuYWJsZWQ6IGJvb2xlYW4pIHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0Y29uc3QgeyByb3dzOiB1c2VyQmVsb25nc1RvUHJvamVjdCB9ID0gYXdhaXQgdGhpcy5kYkludGVyZmFjZS5xdWVyeShnZXRVc2VyUGVybWlzc2lvbnNGb3JQcm9qZWN0LCBbcHJvamVjdElkLCBlbWFpbF0pXG5cdFx0aWYodXNlckJlbG9uZ3NUb1Byb2plY3QubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgeyByb3dzOiBhbGxGZWF0dXJlRm9yQ3VycmVudFByb2plY3QgfSA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UucXVlcnkoc2VsZWN0QWxsRmVhdHVyZXNGcm9tUHJvamVjdCwgW2VtYWlsLCBwcm9qZWN0SWRdKTtcblx0XHRcdGNvbnN0IGZlYXR1cmVFeGlzdHMgPSBhbGxGZWF0dXJlRm9yQ3VycmVudFByb2plY3QuZmluZCgoZjogYW55KSA9PiBmLmZlYXR1cmVfbmFtZSA9PT0gbmFtZSk7XG5cdFx0XHRcblx0XHRcdGlmKCFmZWF0dXJlRXhpc3RzKSB7XG5cdFx0XHRcdGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgdGhpcy5kYkludGVyZmFjZSEucXVlcnkobmV3RmVhdHVyZSwgW3Byb2plY3RJZCwgbmFtZSwgdmFsdWUsIGVuYWJsZWQsIGRlc2NyaXB0aW9uXSk7XG5cdFx0XHRcdHJldHVybiByb3dzWzBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGRlbGV0ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIGVtYWlsOiBzdHJpbmcpIHtcblx0XHRjb25zdCB7IHJvd3M6IGN1cnJlbnRQcm9qZWN0VXNlclBlcm1pc3Npb25zIH0gPSBhd2FpdCB0aGlzLmRiSW50ZXJmYWNlLnF1ZXJ5KGdldFVzZXJQZXJtaXNzaW9uc0ZvclByb2plY3QsIFtwcm9qZWN0SWQsIGVtYWlsXSk7XG5cdFx0aWYoY3VycmVudFByb2plY3RVc2VyUGVybWlzc2lvbnMubGVuZ3RoICYmIGN1cnJlbnRQcm9qZWN0VXNlclBlcm1pc3Npb25zWzBdLmlzX2FkbWluKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCB7cm93czogcHJvamVjdFRvRGVsZXRlfSA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UucXVlcnkoc2VsZWN0UHJvamVjdEZvclVzZXIsIFtlbWFpbCwgcHJvamVjdElkXSk7XG5cdFx0XHRcdGNvbnN0IGRlbGV0ZVVzZXJQcm9qZWN0UGVybWlzc2lvbiA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UucXVlcnkoZGVsZXRlQWxsUGVybWlzc2lvbnNGb3JQcm9qZWN0LCBbcHJvamVjdElkXSk7XG5cdFx0XHRcdGNvbnN0IGRlbGV0ZUFsbEZlYXR1cmVzRm9yUHJvamVjdCA9IGF3YWl0IHRoaXMuZGJJbnRlcmZhY2UucXVlcnkoZGVsZXRlQWxsRmVhdHVyZXNUaGF0QmVsb25nVG9Qcm9qZWN0LCBbcHJvamVjdElkXSk7XG5cdFx0XHRcdGNvbnN0IGRlbGV0ZVByb2plY3RCeUlkID0gYXdhaXQgdGhpcy5kYkludGVyZmFjZS5xdWVyeShkZWxldGVQcm9qZWN0LCBbcHJvamVjdElkXSwgJ3VwZGF0ZScpO1xuXHRcdFx0XHRyZXR1cm4gcHJvamVjdFRvRGVsZXRlWzBdO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdHRocm93IGVycjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxufVxuIl19