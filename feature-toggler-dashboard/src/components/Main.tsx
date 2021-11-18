import React, { useRef, useState } from "react";
import { Link, Route } from "react-router-dom";
import req from "../api/requests";
import useStore from "../appState/appState";
import useClickOutside from "../hooks/useClickOutside";
import { Project } from "../types/ft";
import EditFeatureToggle from "./EditFeatureToggle";
import Features from "./Features";
import ProjectSettings from "./ProjectSettings";

type MainProps = {
    activeProject: Project | null;
    currentView: 'features' | 'settings' | 'api';
    children?: React.ReactElement;
    onCurrentView: (view: 'features' | 'settings' | 'api') => void;
    onProjectDelete: () => void;
}
const Main = ({activeProject, currentView, onCurrentView, onProjectDelete, children}: MainProps) => {
    const { projects, features, newFeature } = useStore((state) => ({
      features: state.features,
      projects: state.projects,
      newFeature: state.newFeature,
    }));

    const [editFeatureWindowOpen, setEditFeatureWindowOpen] = useState(false);
    const [featureToggleToEdit, setFeatureToggleToEdit] = useState(null);

    const newFeatureWindowRef = useRef<HTMLDivElement>(null);
    const onClickOutside = () => {
        setEditFeatureWindowOpen(false);
    };
    useClickOutside(newFeatureWindowRef, onClickOutside);

    const filteredFeaturesByProject = features ? features.filter(f => {
      if(activeProject) {
        return f.project_id === activeProject!.project_id
      }
      return f;
    }) : [];
    
    const createNewFeatureToggle = async (featureToggle: {name: string, value: string, description: string, enabled: boolean}) => {
      try {
        const r = await req.post(`/projects/features/new?projectid=${activeProject!.project_id}&name=${featureToggle.name}&value=${featureToggle.value}&description=${featureToggle.description}&enabled=${featureToggle.enabled ? 1 : 0}`);
        if(r && r.status === 200) {
          newFeature({...r.data, project_name: filteredFeaturesByProject[0].project_name})
        } else {
          console.log(r.data);
        }
      } catch(err) {
        req.LOG('CREATE FEATURE', err as Error);
      }
    }

    return (
        <main className="main-wrapper">
        {
          activeProject && (
            <nav className="bg-gray-100 pt-2 pl-2 settings-menu">
              <ul className="flex">
                <li>
                  <Link to={`/projects/${activeProject.project_id}/features`}>
                    <button  onClick={() => onCurrentView('features')} className={currentView === 'features' ? 'w-full h-full py-2 px-4 bg-white rounded-t-lg border-l-2 border-t-2 border-r-2 border-gray-200' : 'w-full h-full py-2 px-4'}>
                      Feature toggles
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to={`/projects/${activeProject.project_id}/settings`}>
                    <button onClick={() => onCurrentView('settings')} className={currentView === 'settings' ? 'w-full h-full py-2 px-4 bg-white rounded-t-lg border-l-2 border-t-2 border-r-2 border-gray-200' : 'w-full h-full py-2 px-4'}>
                        Project settings
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to={`/projects/${activeProject.project_id}/api`}>
                    <button onClick={() => onCurrentView('api')} className={currentView === 'api' ? 'w-full h-full py-2 px-4 bg-white rounded-t-lg border-l-2 border-t-2 border-r-2 border-gray-200' : 'w-full h-full py-2 px-4'}>
                        API integration
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          )
        }
        { children }
        <div className="main-content pb-4 pl-4">
          <Route path="/projects/:projectId/:section" render={({ match }) => {
            
            const showSection = (section: 'features' | 'settings' | 'api') => {
              return match.params.section === section && activeProject !== null;
            }

            return (
                <div className="overflow-y-scroll pt-4 pr-4" style={{height: 'calc(100vh - 100px)'}}>
                  {
                    showSection('features') && (
                      <div>
                        <div className="mb-4">
                          <div className="flex justify-between align-bottom">
                            <h3 className="text-2xl">{activeProject ? activeProject.project_name : ''}</h3>
                            <button 
                              className="h-14 transition duration-200 ease-in-out bg-blue-50 hover:bg-blue-100 text-sm md:text-lg font-semibold text-gray-700 rounded border border-solid border-blue-300 p-1 md:p-3"
                              onClick={() => setEditFeatureWindowOpen(true)}
                              >
                                + New toggle
                              </button>
                          </div>
                        </div>
                        {
                          filteredFeaturesByProject.length === 0 && activeProject && (
                            <div>
                              No feature toggles for current project!
                            </div>
                          )
                        }
                        {
                         filteredFeaturesByProject.length > 0 && (
                            <>
                              <Features 
                                features={filteredFeaturesByProject}
                                onEditFeature={(feature: any) => {
                                  setFeatureToggleToEdit(feature)
                                  setEditFeatureWindowOpen(true);
                                } }
                              />
                            </>
                          )
                        }
                    </div>
                    ) 
                  }
                  {
                    showSection('settings') && (
                      <ProjectSettings 
                        currentProject={activeProject!}
                        onProjectDelete={() => onProjectDelete()}
                      />
                    )
                  }
                  {
                    showSection('api') && (
                      <div>
                        <div>
                          <h2 className="font-bold">JavaScript fetch api:</h2>
                          <pre className="p-3 text-left text-xs md:text-sm bg-blue-50">
                            <code>
                              {
                                `
const options = {
  headers: {
      'ft-key': '${activeProject!.project_id}',
    }
}

fetch('http://localhost:3010/features', options)
.then(data => data.json())
.then(res => console.log(res));
`
                              }
                            </code>
                          </pre>
                        </div>
                      </div>
                    )
                  }
                </div>
            )
          }}/>
        </div>
        {
          editFeatureWindowOpen && (
            <div  className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20" >
              <div ref={newFeatureWindowRef}>
                <EditFeatureToggle
                  editFeatureToggle={featureToggleToEdit}
                  onCloseWindow={() => {
                    if(featureToggleToEdit) {
                      setFeatureToggleToEdit(null);
                    }
                    setEditFeatureWindowOpen(false);
                  }}
                  onCreateNewFeatureToggle={(featureToggle: {name: string, value: string, description: string, enabled: boolean}) => createNewFeatureToggle(featureToggle)}
                />
              </div>
            </div>
          )
        }
      </main>
    )
};

export default Main;