import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "../types/ft";

type SidebarProps = {
    projects: Project[];
    activeProject: Project | null;
    onActiveProjectChange: (activeProject: Project) => void;
    children?: React.ReactElement;
}
export const Sidebar = React.memo(({projects, activeProject, onActiveProjectChange, children}: SidebarProps) => {
    
    const handleActiveProject = (newActiveProject: Project) => {
      if(newActiveProject.project_id !== activeProject?.project_id) {
        onActiveProjectChange(newActiveProject);
      }
    };

    return (
        <aside className="project-sidebar flex flex-col justify-start">
          <div className="h-12 py-3 font-bold">Feature Toggler</div>
          <nav className="flex flex-col flex-grow justify-between">
          {
            projects && projects.length > 0 && (
              <ul className="project-list">
              {
              projects.map(p => (
                  <li className="project-list-item" key={p.project_id}>
                    <Link to={`/projects/${p.project_id}/features`}>
                      <button 
                        className={activeProject && (activeProject.project_id === p.project_id) ? 'transparent-btn w-100 h-100 active-project' : 'transparent-btn w-100 h-100'}
                        onClick={() => handleActiveProject(p)}
                      >
                        { p.project_name }
                      </button>
                    </Link>
                  </li>
                ))
              }
            </ul>
          )
          }
            {children}
          </nav>
        </aside>
    )
})

export default Sidebar;