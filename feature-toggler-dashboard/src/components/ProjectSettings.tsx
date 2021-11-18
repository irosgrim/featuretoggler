import { useEffect, useState } from "react";
import useStore from "../appState/appState";
import { Project } from "../types/ft";

type ProjectSettingsProps = {
    currentProject: Project;
    onProjectDelete: () => void;
}

const defaultCopyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
);

const checkCopyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

const ProjectSettings = ({currentProject, onProjectDelete}: ProjectSettingsProps) => {
    
    const [projectName, setProjectName] = useState('');
    const [copyApiKeyIcon, setCopyApiKeyIcon] = useState(defaultCopyIcon);
    const [deleteProject, setDeleteProject] = useState('');
    const [showDeleteWindow, setShowDeleteWindow] = useState(false);
    const { deleteProjectWithId } = useStore((state) => ({ deleteProjectWithId: state.deleteProject}));

    useEffect(() => {
        if(currentProject) {
            setProjectName(currentProject.project_name)
        }
    }, [currentProject]);
    const updateProjectNameButtonEnabled = () => currentProject && (currentProject.project_name !== projectName) && projectName.length < 40;
    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopyApiKeyIcon(checkCopyIcon)
        setTimeout(() => setCopyApiKeyIcon(defaultCopyIcon), 3000);
    };

    const enableDeleteProject = () => currentProject && currentProject.project_id === deleteProject;
    const handleDeleteProject = async () => {
        if(deleteProject) {
            const r = await deleteProjectWithId(deleteProject);
            console.log(r);
            setDeleteProject('');
            onProjectDelete();
        }
    }
    const handleShowDeleteWindow = () => {
        if(!showDeleteWindow) {
            setShowDeleteWindow(true);
        }
    }
    return (
        <div>
           {
               currentProject && (
                   <>
                        <label htmlFor="new_project_name" className="block font-bold">
                            Project name
                        </label>
                        <div className="md:flex">
                            <input 
                                type="text" 
                                id="new_project_name" 
                                placeholder="project name" 
                                className="border border-gray-400 rounded-md p-2 w-full sm:w-2/3 md:w-1/3 mb-4 md:mb-0"
                                value={projectName}
                                required
                                onInput={(e: any) => setProjectName(e.target.value)}
                            />
                            <button
                                type="button"
                                className={updateProjectNameButtonEnabled() ? 'border border-blue-400 bg-blue-50 rounded-md p-2 md:ml-4' : 'border border-blue-400 bg-blue-50 rounded-md p-2 md:ml-4 opacity-50 cursor-auto'}
                                disabled={!updateProjectNameButtonEnabled()}
                                onClick={() => console.log('enabled')}
                            >
                                Update project name
                            </button>
                        </div>
                        <label htmlFor="copy_project_id" className="block font-bold mt-4">
                            Project API key
                        </label>
                        <div className="flex">
                            <input 
                                type="text" 
                                id="copy_project_id" 
                                placeholder="project API key" 
                                className="border border-gray-400 rounded-md p-2 w-2/3 md:w-1/3 font-semibold text-red-900"
                                disabled
                                value={currentProject.project_id}
                            />
                            <button 
                                className="border border-blue-400 bg-blue-50 rounded-md p-2 ml-4"
                                onClick={() => copyToClipboard(currentProject.project_id)}
                            >
                                {copyApiKeyIcon}
                            </button>
                        </div>

                        <div className="relative">
                            {
                                showDeleteWindow && (
                                    <div className="absolute -top-10 bg-red-50 rounded-md p-4 w-1/3 mt-8 shadow-lg border border-solid">
                                        <label htmlFor="confirm_delete_project" className="block font-bold">
                                            Type in project API key to confirm delete
                                        </label>
                                        <div>
                                            <input 
                                                type="text" 
                                                id="confirm_delete_project" 
                                                className="border bg-white rounded-md p-2 w-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                                                value={deleteProject}
                                                required
                                                onInput={(e: any) => setDeleteProject(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className={enableDeleteProject() ? 'mt-4 border border-red-400 bg-red-50 rounded-md p-2' : 'mt-4 border border-red-400 bg-red-50 rounded-md p-2 opacity-50 cursor-auto'}
                                                disabled={!enableDeleteProject()}
                                                onClick={() => handleDeleteProject()}
                                            >
                                                Delete project
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-4 border border-blue-400 bg-blue-50 rounded-md p-2 ml-4"
                                                onClick={() => setShowDeleteWindow(false)}
                                            >
                                                 Cancel
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            <button 
                                className="mt-12 flex justify-between border border-solid border-red-300 rounded-md bg-red-50 p-2 w-2/3 md:w-1/3"
                                onClick={() => handleShowDeleteWindow()}
                            >
                                <p className="font-bold text-red-500">
                                    Delete project
                                </p>
                                <div className="ml-4">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-6 w-6 text-red-500" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                   </>
               )
           }
        </div>
    )
}

export default ProjectSettings;