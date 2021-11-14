import { SqliteDB, PostgresDB } from ".";
import { v4 as uuidv4 } from 'uuid';
import { deleteAllFeaturesThatBelongToProject, deleteAllPermissionsForProject, deleteFeatureById, deleteProject, getFeatureStateById, getUserPermissionsForProject, newFeature, newProjectForUser, newUserProjectPermissions, selectAllFeaturesForUser, selectAllFeaturesFromProject, selectAllProjectsForUser, selectProjectForUser, toggleFeature } from "./queries";

export class DatabaseApi {
	private dbInterface: PostgresDB | SqliteDB;
	constructor(dbInterface: any) {
		this.dbInterface = dbInterface;
	}
	async getAllProjectsForUser(email: string): Promise<void | any[]> {
		try {
			const { rows } = await this.dbInterface!.query(selectAllProjectsForUser, [email]);
			return rows;
		} catch (err) {
			console.log("getAllProjectsForCurrentUser error: ", err);
		}
	}
	async newProject(email: string, projectName: string, active: boolean, isAdmin: boolean): Promise<any> {
		try {
			console.log({active, isAdmin});
			const projectId = uuidv4();
			const getOrganizationId = `
				SELECT organization_id FROM users
				WHERE email=$1;
			`;
			const getSpecificProjectFromOrganization = `
				SELECT project_name FROM projects
				WHERE organization_id=$1 AND project_name=$2;
			`;
			const {rows: organizationId} = await this.dbInterface.query(getOrganizationId, [email]);
			const {rows: specificProject} = await this.dbInterface.query(getSpecificProjectFromOrganization, [organizationId[0].organization_id, projectName]);
			if(specificProject.length) {
				return -1;
			}
			const newProject = await this.dbInterface!.query(newProjectForUser, [projectId, projectName, active, organizationId[0].organization_id]);
			const newProjectPermissionsForUser = await this.dbInterface!.query(newUserProjectPermissions, [projectId, email, isAdmin]);
			const { rows } = await this.dbInterface!.query(selectProjectForUser, [email, projectId]);
			return rows;
		} catch (err) {
			console.log("newProject error: ", err);
		}
	}
	async getAllFeaturesForCurrentUser(email: string): Promise<void | any[]> {
		try {
			const { rows } = await this.dbInterface!.query(selectAllFeaturesForUser, [email]);
			return rows;
		} catch (err) {
			console.log("getAllFeaturesForCurrentUser error: ", err);
		}
	}
	async getProjectForCurrentUserById(email: string, projectId: string) {
		return [];
	}

	async updateFeature(projectId: string, featureName: string, featureEnabled: boolean) {
		const { rows } = await this.dbInterface!.query(toggleFeature, [featureEnabled, projectId, featureName]);
		return rows[0];
	}

	async getFeatureStateById(projectId: string, featureName: string) {
		const { rows } = await this.dbInterface!.query(getFeatureStateById, [projectId, featureName]);
		return rows[0];
	}

	async deleteFeatureById(projectId: string, featureName: string) {
		const { rows } = await this.dbInterface!.query(deleteFeatureById, [projectId, featureName], 'delete');
		return rows[0];
	}

	async newFeature(email: string, projectId: string, name: string, value: string, description: string, enabled: boolean) {
		// @ts-ignore
		const { rows: userBelongsToProject } = await this.dbInterface.query(getUserPermissionsForProject, [projectId, email])
		if(userBelongsToProject.length > 0) {
			const { rows: allFeatureForCurrentProject } = await this.dbInterface.query(selectAllFeaturesFromProject, [email, projectId]);
			const featureExists = allFeatureForCurrentProject.find((f: any) => f.feature_name === name);
			
			if(!featureExists) {
				const { rows } = await this.dbInterface!.query(newFeature, [projectId, name, value, enabled, description]);
				return rows[0];
			}
		}
	}

	async deleteProject(projectId: string, email: string) {
		const { rows: currentProjectUserPermissions } = await this.dbInterface.query(getUserPermissionsForProject, [projectId, email]);
		if(currentProjectUserPermissions.length && currentProjectUserPermissions[0].is_admin) {
			try {
				const {rows: projectToDelete} = await this.dbInterface.query(selectProjectForUser, [email, projectId]);
				const deleteUserProjectPermission = await this.dbInterface.query(deleteAllPermissionsForProject, [projectId]);
				const deleteAllFeaturesForProject = await this.dbInterface.query(deleteAllFeaturesThatBelongToProject, [projectId]);
				const deleteProjectById = await this.dbInterface.query(deleteProject, [projectId], 'update');
				return projectToDelete[0];
			} catch (err) {
				throw err;
			}
		}
	}

}
