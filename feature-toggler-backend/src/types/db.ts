export type Project = {
	id: number;
	enabled: boolean;
	name: string;
	value: string | number | null;
};

export type Projects = {
	[key: string]: Project[];
};

export interface DB {
	projects: Projects;
	getProject: (id: string) => Project[] | undefined;
	getAllProjectsForCurrentUser: (email: string) => Promise<any[]>;
	getProjectForCurrentUserById: (email: string, projectId: string) => Promise<any[]>;
}
