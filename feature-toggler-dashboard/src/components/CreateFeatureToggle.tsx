import React, { useReducer, useState } from "react";
import Toggle from "./Toggle";

type CreateToggleProps = {
    onCloseWindow: () => void;
    onCreateNewFeatureToggle: (newFeatureToggle: NewFeatureToggle) => void;
}

type NewFeatureToggle = {
    name: string;
    value: string;
    description: string;
    enabled: boolean;
}

type Action = {
    type: 'changeName' | 'changeValue'| 'changeDescription' | 'isEnabled';
    payload: string | boolean;
}

const newFeatureToggleInitialState = {
    name: '',
    value: '',
    description: '',
    enabled: false,
}

const reducer = (state: NewFeatureToggle, action: Action) => {
    switch(action.type) {
        case 'changeName':
            return {
                ...state,
                name: action.payload,
            }
        case 'changeValue':
            return {
                ...state,
                value: action.payload,
            }
        case 'changeDescription':
            return {
                ...state,
                description: action.payload,
            }
        case 'isEnabled':
            return {
                ...state,
                enabled: action.payload,
            }
        default:
            return state;
    }
}

const CreateFeatureToggle = ({onCloseWindow, onCreateNewFeatureToggle}: CreateToggleProps) => {
    // @ts-ignore
    const [ newFeatureToggle, dispatch ] = useReducer(reducer, newFeatureToggleInitialState);
    // @ts-ignore
    const setNewFeatureToggleName = (name: string) => dispatch({type: 'changeName', payload: name});
    
    // @ts-ignore
    const setNewFeatureToggleValue = (value: string) => dispatch({type: 'changeValue', payload: value });

    // @ts-ignore
    const setNewFeatureToggleDescription = (value: string) => dispatch({type: 'changeDescription', payload: value});

    // @ts-ignore
    const setFeatureToggleIsEnabled = (value: boolean) => dispatch({type: 'isEnabled', payload: value });

    const handleCreateNewFeature = () => {
        if(newFeatureToggle.name) {
            onCreateNewFeatureToggle(newFeatureToggle);
        }
    }

    return (
        <>
            <div className="toggle-details-window text-left w-full sm:w-3/4 md:w-2/5">
                <div className="flex justify-end">
                    <button className="h-10 w-10 text-2xl" onClick={() => onCloseWindow()}>
                        &times;
                    </button>
                </div>
                <div>
                    <h3 className="font-bold mb-8">Add new feature toggle to <span className="capitalize">project name</span></h3>
                    <label htmlFor="feature_name" className="block font-bold">
                    Feature name
                    </label>
                    <input 
                        type="text" 
                        id="feature_name" 
                        placeholder="feature name" 
                        className="border border-gray-400 rounded-md p-2 w-100"
                        required
                        onInput={(e: any) => setNewFeatureToggleName(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-bold">
                    Value
                    </label>
                    <input 
                        type="text" 
                        placeholder="some value" 
                        className="border border-gray-400 rounded-md p-2 w-100"
                        onInput={(e: any) => setNewFeatureToggleValue(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="block font-bold">
                    Description
                    </label>
                    <input 
                        type="text" 
                        placeholder="feature description" 
                        className="border border-gray-400 rounded-md p-2 w-100"
                        onInput={(e: any) => setNewFeatureToggleDescription(e.target.value)}
                    />
                </div>
                <div className="mt-8">
                    <Toggle 
                        id="toggle_enabled"
                        label={(<span className="font-bold mr-4">Enabled</span>)}
                        labelPosition="left"
                        checked={newFeatureToggle.enabled}
                        onChange={() => setFeatureToggleIsEnabled(!newFeatureToggle.enabled)}
                    />
                </div>
                <div className="mt-8">
                    <button 
                        className="border-2 border-blue-400 rounded-md p-3 bg-blue-100"
                        type="button" 
                        onClick={() => handleCreateNewFeature()}
                    >
                    Create feature
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateFeatureToggle;