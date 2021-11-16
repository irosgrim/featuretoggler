import create, { SetState } from "zustand";
import { devtools, persist, StateStorage } from 'zustand/middleware';
import { get, set } from 'idb-keyval';
import req from "../api/requests";
import { Feature, Project, ServerFeatureChangeResponse } from "../types/ft";

type FetchStatus = 'done' | 'loading' | 'error' | string;

type PartialFeature = {
  feature_name: string;
  feature_value: string | null;
  feature_description: string | null;
  feature_enabled: boolean;
}

interface ProjectsState {
    projects: Project[];
    projectsFetchingStatus: FetchStatus;
    fetchAllProjects: () => Promise<Project[]>;
    updateProject: (projectId: string) =>  void;
    newProject: (project: {name: string, active: boolean}) => Promise<Project | void>;
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
            if(!res) {
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
          } catch(err) {
            req.LOG('Couldnt fetch projects ', err as Error);
            set({
              projectsFetchingStatus: 'error',
            });
          }
    },
    updateProject: (projectId: string) => true,
    newProject: async (project: {name: string, active: boolean}) => {
        try {
            const res = await req.post(`/projects/new?projectname=${project.name}&active=${project.active}`);
            if(res.status !== 200) {
              return;
            }
            set((state) => {
                const newProjects = [...state.projects, res.data];
                return {
                    projects: [...newProjects]
                }
            });
            return res.data;

          } catch (err) {
            req.LOG('NEW PROJECT ERROR: ', err as Error);
          }
    },
    deleteProject: async (projectId: string) => {
      try {
        const res = await req.post(`/projects/delete?projectid=${projectId}`);
        if(res.status !== 200) {
          console.log(res.data);
          return;
        }
        set((state) => {
          const newProjects = state.projects.filter(project => project.project_id !== projectId);
          return {
              projects: [...newProjects]
          }
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
            })
            const res = await req.get('/projects/features');
            if(!res) {
              set({
                  featuresFetchingStatus: 'error',
              });
            }
            set({
              features: res,
              featuresFetchingStatus: 'done',
            });
            return res;
          } 
          catch (err) {
            req.LOG('Couldnt fetch all features');
            set((state) =>{
                return {
                    featuresFetchingStatus: 'error'
                }
            })
          }
    },
    updateFeature: (feature: ServerFeatureChangeResponse) => {
        set((state) => {
            const updatedFeatures = state.features.map((f: Feature) => {
                if(f.feature_id === feature.feature_id) {
                  f.feature_enabled = feature.feature_enabled;
                  f.feature_name = feature.feature_name;
                  f.feature_value = feature.feature_value;
                }
                return f;
            });
            return {
                features: [...updatedFeatures]
            }
        })
    },
    newFeature: (feature: Feature) => {
        set((state) => {
            return {
                features: [...state.features, feature]
            }
        })
    },
    deleteFeature: async (projectId: string, featureName: string | number) => {
        try {
            const res = await req.delete(`/projects/features/delete/${projectId}/${featureName}`);
            if(res) {
                set((state) => {
                    const newFeatures = state.features.filter(feature => feature.feature_name !== featureName);
                    return {
                        features: [...newFeatures]
                }})
                return;
            }
            console.log('----Cant delete feature----');
          } catch(err) {
            req.LOG('DELETE: ', err as Error)
          }
    },
    toggleFeature: async(projectId: string, featureName: string | number, enabled: boolean) => {
        try {
            const res = await req.post(`/projects/features/update/${projectId}/${featureName}?enabled=${enabled}`);
            if(res.status === 200) {
              set((draft) => {
                  draft.updateFeature(res.data)
              })
              return;
            }
            console.log('----Cant toggle----');
          } catch(err) {
            req.LOG('TOGGLE: ', err as Error);
          }
    }
})

const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
      console.log(name, "has been retrieved");
      return await get(name) || null
    },
    setItem: async (name: string, value: string): Promise<void> => {
      console.log(name, "with value", value, "has been saved");
      set(name, value)
    }
  }
// @ts-ignore
const getLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

export const useLocalStorage = create(
    (set: SetState<{fruits: string[], addFruit: (fruit: string) => void}>, get) => ({
      fruits: getLocalStorage("fruits") || ['banana', 'apple', 'cherries'],
      setFruits: (fruits: string[]) =>
        set((state) => {
          setLocalStorage("fruits", fruits);
          return { fruits };
        })
    })
);

const useStore = create<AllStores>(devtools((set) => ({
    ...projectsStore(set),
    ...featuresStore(set),
})));

export default useStore;