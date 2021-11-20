import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import './styles/App.scss';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import useClickOutside from './hooks/useClickOutside';
import useStore from './appState/appState';
import { Project } from './types/ft';

const App: React.FC = (): React.ReactElement => {
	const { projects, projectsFetchingStatus, featuresFetchingStatus, fetchAllProjects, fetchAllFeatures, newProject } = useStore((state) => ({
		projects: state.projects,
		projectsFetchingStatus: state.projectsFetchingStatus,
		featuresFetchingStatus: state.featuresFetchingStatus,
		fetchAllProjects: state.fetchAllProjects,
		fetchAllFeatures: state.fetchAllFeatures,
		newProject: state.newProject,
	}));

	const [newProjectWindowOpen, setNewProjectWindowOpen] = useState(false);
	const [newProjectName, setNewProjectName] = useState('');
	const [currentView, setCurrentView] = useState<'features' | 'settings' | 'api'>('features');
	const [activeProject, setActiveProject] = useState<Project | null>(null);
	const newProjectWindowRef = useRef<HTMLDivElement>(null);

	const pageIsLoading = () => projectsFetchingStatus === 'loading' || featuresFetchingStatus === 'loading';
	const errorFetchingData = () => projectsFetchingStatus === 'error' || featuresFetchingStatus === 'error';
	const onClickOutside = () => {
		setNewProjectWindowOpen(false);
	};

	useClickOutside(newProjectWindowRef, onClickOutside);
	const handleActiveProject = (newActiveProject: Project) => {
		if (newActiveProject.project_id !== activeProject?.project_id) {
			setActiveProject(newActiveProject);
			setCurrentView('features');
		}
	};

	const handleNewProject = async () => {
		if (newProjectName !== '') {
			try {
				const project = await newProject({ name: newProjectName, active: true });
				if (project) {
					setActiveProject(project);
				}
				setNewProjectWindowOpen(false);
			} catch (err) {
				console.log('error pushing route: ', err);
			}
		}
	};

	useEffect(() => {
		fetchAllProjects().then((r: Project[]) => {
			if (r && r.length > 0) {
				setActiveProject(r![0]);
			}
		});
		fetchAllFeatures();
	}, []);
	return (
		<div className="app-wrapper">
			{newProjectWindowOpen && (
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 z-10">
					<div className="bg-white rounded-md p-4 w-4/5 md:w-1/3 mx-auto mt-12 text-left" ref={newProjectWindowRef}>
						<label htmlFor="project_name" className="block font-bold text-left mb-4">
							Project name
						</label>
						<input
							type="text"
							id="project_name"
							className="border border-gray-400 rounded-md p-2 w-100"
							onChange={(e) => setNewProjectName(e.target.value)}
						/>
						<button
							type="button"
							className={`border-2 border-blue-400 rounded-md p-3 bg-blue-100 mt-8 ${
								newProjectName === '' && 'opacity-50 cursor-auto'
							}`}
							onClick={() => handleNewProject()}
							disabled={newProjectName === ''}
						>
							Create project
						</button>
					</div>
				</div>
			)}
			<Router>
				{activeProject && <Redirect to={`/projects/${activeProject.project_id}/features`} push />}
				<Sidebar projects={projects} activeProject={activeProject} onActiveProjectChange={handleActiveProject}>
					<div>
						<button
							type="button"
							className="w-100 h-100 py-4 transition duration-200 ease-in-out bg-blue-50 hover:bg-blue-100 text-lg font-semibold text-gray-700"
							onClick={() => setNewProjectWindowOpen(true)}
						>
							+ New project
						</button>
					</div>
				</Sidebar>
				<Main
					activeProject={activeProject}
					currentView={currentView}
					onCurrentView={(view) => setCurrentView(view)}
					onProjectDelete={() => setActiveProject(projects[projects.length - 1])}
				>
					<>
						{pageIsLoading() && <PageStatus status="loading">Loading...</PageStatus>}
						{errorFetchingData() && <PageStatus status="fetch-fail">Failed to fetch data, reload page!</PageStatus>}
					</>
				</Main>
			</Router>
		</div>
	);
};

const PageStatus = ({ status, children }: { status: 'loading' | 'fetch-fail'; children?: ReactNode }) => {
	return (
		<div>
			{status === 'loading' && <p className="mt-3 text-center">{children}</p>}
			{status !== 'loading' && (
				<div className="p-2 bg-red-50 border border-pink-200" style={{ width: 'calc(100% - 1px)' }}>
					{children}
				</div>
			)}
		</div>
	);
};
export default App;
