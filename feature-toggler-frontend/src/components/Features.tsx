import { useState } from "react";
import useStore from "../appState/appState";
import { partialStringMatch } from "../helpers/strings";
import { Feature } from "../types/ft";
import Toggle from "./Toggle";

const Features = ({features}: {features: Feature[]}) => {
    const [search, setSearch] = useState('');
    const { deleteFeature, toggleFeature } = useStore((state) => ({
        deleteFeature: state.deleteFeature,
        toggleFeature: state.toggleFeature,
      }));

    const filteredFeatures = () => {
        return features.filter(f => partialStringMatch(search)(f.feature_name))
    }
    
    return (
        <>
            <div>
                <p>Manage feature toggles for current project</p>
                <div className="flex justify-end">
                    <div className="relative">
                    <input 
                        type="text" 
                        className="border rounded-sm border-solid border-gray-400 h-8 pl-2 pr-6" 
                        placeholder="filter"
                        onInput={(e: any) => setSearch(e.target.value)}
                    />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-2 top-2 h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <ul className="list-style-none mt-4 p-0">
                {
                    filteredFeatures().map((feature: Feature) => (
                        <li className="flex justify-between shadow-md border border-solid rounded-md border-gray-200 p-4 mb-4" key={feature.project_id + feature.feature_name}>
                            <div className={!feature.feature_enabled ? 'opacity-50' : ''}>
                                <h3 className="m-0 p-0 font-bold">{feature.feature_name}</h3>
                                <p className="m-0 h-6">{feature.feature_description || ''}</p>
                                <p className="m-0 small text-gray-500">Created on: {feature.date_created}</p>
                            </div>
                            <div className="feature-controls ml-3">
                                <Toggle
                                    id={feature.project_id + feature.feature_name}
                                    checked={feature.feature_enabled} 
                                    onChange={() => toggleFeature(feature.project_id, feature.feature_name, !feature.feature_enabled)}
                                />
                                <div className="flex">
                                    <button className="ml-4 mr-14">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    </button>
                                    <button className="ml-4" onClick={() => deleteFeature(feature.project_id, feature.feature_name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default Features;