type Project = {
	id: number;
	enabled: boolean;
	name: string;
	value: string | number | null;
};

type Projects = {
	[key: string]: Project[];
};

interface Database {
	getAllProjectsForUser: (email: string) =>  Promise<void | any[]>;
	newProject: (email: string, projectName: string, active: boolean, isAdmin: boolean) => Promise<any>;
	deleteProject: (projectId: string, email: string) => Promise<any>;
	getAllFeaturesForCurrentUser: (email: string) => Promise<any[] | void>;
	getProjectById:(projectId: string) => Promise <any[] | void >;
	getAllFeaturesForProject: (projectId: string) => Promise<any[] | void>;
	updateFeature: (projectId: string, featureName: string, featureEnabled: any) => Promise<any>;
	getFeatureStateById: (projectId, featureName: string) => Promise<any>;
	deleteFeatureById: (projectId: string, featureName: string) => Promise<any>;
	newFeature: (email: string, projectid: string, name: string, value: string, description: string, enabled: boolean) => Promise<any>;
}

declare namespace Express {
	interface Request {
		io?: any;
		projectKey?: string;
		user?: {
			username: string;
			name: string;
			email: string;
		};
		services?: {
			db: Database;
		};
	}
}
