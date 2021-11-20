import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import req from '../api/requests';
import { Feature, Project, ServerFeatureChangeResponse } from '../types/ft';

type FetchStatus = 'done' | 'loading' | 'error' | string;

interface ProjectsState {
	projects: Project[];
	projectsFetchingStatus: FetchStatus;
	fetchAllProjects: () => Promise<Project[]>;
	updateProject: (projectId: string) => void;
	newProject: (project: { name: string; active: boolean }) => Promise<Project | void>;
	deleteProject: (projectId: string) => Promise<'OK' | void>;
}

interface FeaturesState {
	features: Feature[];
	featuresFetchingStatus: FetchStatus;
	fetchAllFeatures: () => void;
	updateFeature: (feature: ServerFeatureChangeResponse) => void;
	newFeature: (feature: Feature) => void;
	deleteFeature: (projectId: string, featureName: string) => void;
	toggleFeature: (projectId: string, featureName: string, enabled: boolean) => void;
}

type AllStores = ProjectsState & FeaturesState;

const projectsStore = (set: SetState<AllStores>) => ({
	projects: [],
	projectsFetchingStatus: 'done',
	fetchAllProjects: async () => {
		try {
			set({
				projectsFetchingStatus: 'loading',
			});
			const res = await req.get('/projects/');
			if (!res) {
				set({
					projects: [],
					projectsFetchingStatus: 'error',
				});
			}
			set({
				projects: res,
				projectsFetchingStatus: 'done',
			});
			return res;
		} catch (err) {
			req.LOG('Couldnt fetch projects ', err as Error);
			set({
				projectsFetchingStatus: 'error',
			});
		}
	},
	updateProject: (projectId: string) => console.log(projectId),
	newProject: async (project: { name: string; active: boolean }) => {
		try {
			const res = await req.post(`/projects/new?projectname=${project.name}&active=${project.active}`);
			if (res.status !== 200) {
				return;
			}
			set((state) => {
				const newProjects = [...state.projects, res.data];
				return {
					projects: [...newProjects],
				};
			});
			return res.data;
		} catch (err) {
			req.LOG('NEW PROJECT ERROR: ', err as Error);
		}
	},
	deleteProject: async (projectId: string) => {
		try {
			const res = await req.post(`/projects/delete?projectid=${projectId}`);
			if (res.status !== 200) {
				console.log(res.data);
				return;
			}
			set((state) => {
				const newProjects = state.projects.filter((project) => project.project_id !== projectId);
				return {
					projects: [...newProjects],
				};
			});
			return 'OK';
		} catch (err) {
			req.LOG('NEW PROJECT: ', err as Error);
		}
	},
});

const featuresStore = (set: SetState<AllStores>) => ({
	features: [],
	featuresFetchingStatus: 'done',
	fetchAllFeatures: async () => {
		try {
			set({
				featuresFetchingStatus: 'loading',
			});
			const res = await req.get('/projects/features');
			if (!res) {
				set({
					featuresFetchingStatus: 'error',
				});
			}
			set({
				features: res,
				featuresFetchingStatus: 'done',
			});
			return res;
		} catch (err) {
			req.LOG('Couldnt fetch all features');
			set(() => {
				return {
					featuresFetchingStatus: 'error',
				};
			});
		}
	},
	updateFeature: (feature: ServerFeatureChangeResponse) => {
		// @ts-ignore
		set((state) => {
			const updatedFeatures = state.features.map((f: Feature) => {
				const updatedProperties = {
					feature_enabled: true,
					feature_name: '',
					feature_value: '',
				};
				if (f.feature_id === feature.feature_id) {
					updatedProperties.feature_enabled = feature.feature_enabled;
					updatedProperties.feature_name = feature.feature_name;
					updatedProperties.feature_value = feature.feature_value;
				}
				return { f, ...updatedProperties };
			});
			return {
				features: [...updatedFeatures],
			};
		});
	},
	newFeature: (feature: Feature) => {
		set((state) => {
			return {
				features: [...state.features, feature],
			};
		});
	},
	deleteFeature: async (projectId: string, featureName: string | number) => {
		try {
			const res = await req.delete(`/projects/features/delete/${projectId}/${featureName}`);
			if (res) {
				set((state) => {
					const newFeatures = state.features.filter((feature) => feature.feature_name !== featureName);
					return {
						features: [...newFeatures],
					};
				});
				return;
			}
			console.log('----Cant delete feature----');
		} catch (err) {
			req.LOG('DELETE: ', err as Error);
		}
	},
	toggleFeature: async (projectId: string, featureName: string | number, enabled: boolean) => {
		try {
			const res = await req.post(`/projects/features/update/${projectId}/${featureName}?enabled=${enabled}`);
			if (res.status === 200) {
				set((draft) => {
					draft.updateFeature(res.data);
				});
				return;
			}
			console.log('----Cant toggle----');
		} catch (err) {
			req.LOG('TOGGLE: ', err as Error);
		}
	},
});

// @ts-ignore
const getLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

export const useLocalStorage = create((set: SetState<{ fruits: string[]; addFruit: (fruit: string) => void }>) => ({
	fruits: getLocalStorage('fruits') || ['banana', 'apple', 'cherries'],
	setFruits: (fruits: string[]) => {
		set(() => {
			setLocalStorage('fruits', fruits);
			return { fruits };
		});
	},
}));

const useStore = create<AllStores>(
	devtools((set) => ({
		...projectsStore(set),
		...featuresStore(set),
	})),
);

export default useStore;
