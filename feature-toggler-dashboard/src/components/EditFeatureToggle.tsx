import React, { useEffect, useReducer, useRef } from 'react';
import { Feature } from '../types/ft';
import Toggle from './Toggle';

type CreateToggleProps = {
	editFeatureToggle: Feature | null;
	onCloseWindow: () => void;
	onCreateNewFeatureToggle: (newFeatureToggle: NewFeatureToggle) => void;
};

type NewFeatureToggle = {
	name: string;
	value: string;
	description: string;
	enabled: boolean;
};

type Action = {
	type: 'changeName' | 'changeValue' | 'changeDescription' | 'isEnabled';
	payload: string | boolean;
};

const newFeatureToggleInitialState = {
	name: '',
	value: '',
	description: '',
	enabled: false,
};

const reducer = (state: NewFeatureToggle, action: Action) => {
	switch (action.type) {
		case 'changeName':
			return {
				...state,
				name: action.payload,
			};
		case 'changeValue':
			return {
				...state,
				value: action.payload,
			};
		case 'changeDescription':
			return {
				...state,
				description: action.payload,
			};
		case 'isEnabled':
			return {
				...state,
				enabled: action.payload,
			};
		default:
			return state;
	}
};

const CreateFeatureToggle: React.FC<CreateToggleProps> = ({ editFeatureToggle, onCloseWindow, onCreateNewFeatureToggle }): React.ReactElement => {
	// @ts-ignore
	const [newFeatureToggle, dispatch] = useReducer(reducer, newFeatureToggleInitialState);
	// @ts-ignore
	const setNewFeatureToggleName = (name: string) => dispatch({ type: 'changeName', payload: name });

	// @ts-ignore
	const setNewFeatureToggleValue = (value: string) => dispatch({ type: 'changeValue', payload: value });

	// @ts-ignore
	const setNewFeatureToggleDescription = (value: string) => dispatch({ type: 'changeDescription', payload: value });

	// @ts-ignore
	const setFeatureToggleIsEnabled = (value: boolean) => dispatch({ type: 'isEnabled', payload: value });

	const nameInputRef = useRef(null);
	const valueInputRef = useRef(null);
	const descriptionInputRef = useRef(null);
	const enabledCheckboxRef = useRef(null);

	const handleCreateNewFeature = () => {
		if (newFeatureToggle.name) {
			onCreateNewFeatureToggle(newFeatureToggle);
		}
	};

	useEffect(() => {
		if (editFeatureToggle) {
			setNewFeatureToggleName(editFeatureToggle.feature_name);
			setNewFeatureToggleDescription(editFeatureToggle.feature_description || '');
			setNewFeatureToggleValue(editFeatureToggle.feature_value);
			setFeatureToggleIsEnabled(editFeatureToggle.feature_enabled);
		}
	}, []);

	const changesWereMade = () => {
		if (!editFeatureToggle) {
			return false;
		}
		return (
			editFeatureToggle.feature_name !== newFeatureToggle.name ||
			editFeatureToggle.feature_value !== newFeatureToggle.value ||
			editFeatureToggle.feature_description !== newFeatureToggle.description ||
			editFeatureToggle.feature_enabled !== newFeatureToggle.enabled
		);
	};

	const handleEditFeatureToggle = () => {
		if (editFeatureToggle) {
			if (changesWereMade()) {
				// todo
				console.log('feature toggle was edited', { project_id: editFeatureToggle.project_id, ...newFeatureToggle });
			}
		}
	};

	const handleUndoChanges = () => {
		if (editFeatureToggle) {
			if (changesWereMade()) {
				setNewFeatureToggleName(editFeatureToggle.feature_name);
				// @ts-ignore
				nameInputRef.current.value = editFeatureToggle.feature_name;

				setNewFeatureToggleDescription(editFeatureToggle.feature_description || '');
				// @ts-ignore
				descriptionInputRef.current.value = editFeatureToggle.feature_description || '';

				setNewFeatureToggleValue(editFeatureToggle.feature_value || '');
				// @ts-ignore
				valueInputRef.current.value = editFeatureToggle.feature_value || '';

				setFeatureToggleIsEnabled(editFeatureToggle.feature_enabled);
				// @ts-ignore
				enabledCheckboxRef.current.value = editFeatureToggle.feature_enabled;
			}
		}
	};

	return (
		<div className="toggle-details-window text-left w-full sm:w-3/4 md:w-2/5">
			<div className="flex justify-end">
				<button type="button" className="h-10 w-10 text-2xl" onClick={() => onCloseWindow()}>
					&times;
				</button>
			</div>
			<div>
				{editFeatureToggle && <h3 className="font-bold mb-8">Edit feature toggle</h3>}
				{!editFeatureToggle && (
					<h3 className="font-bold mb-8">
						Add new feature toggle to
						<span className="capitalize">project</span>
					</h3>
				)}
				<label htmlFor="feature_name" className="block font-bold">
					Feature name
				</label>
				<input
					ref={nameInputRef}
					defaultValue={newFeatureToggle.name}
					type="text"
					id="feature_name"
					placeholder="feature name"
					className="border border-gray-400 rounded-md p-2 w-100"
					required
					onInput={(e: any) => setNewFeatureToggleName(e.target.value)}
				/>
			</div>
			<div className="mt-4">
				<label className="block font-bold">Value</label>
				<input
					ref={valueInputRef}
					defaultValue={newFeatureToggle.value}
					type="text"
					placeholder="some value"
					className="border border-gray-400 rounded-md p-2 w-100"
					onInput={(e: any) => setNewFeatureToggleValue(e.target.value)}
				/>
			</div>
			<div className="mt-4">
				<label className="block font-bold">Description</label>
				<input
					ref={descriptionInputRef}
					defaultValue={newFeatureToggle.description}
					type="text"
					placeholder="feature description"
					className="border border-gray-400 rounded-md p-2 w-100"
					onInput={(e: any) => setNewFeatureToggleDescription(e.target.value)}
				/>
			</div>
			<div className="mt-8">
				<Toggle
					ref={enabledCheckboxRef}
					id="toggle_enabled"
					label={<span className="font-bold mr-4">Enabled</span>}
					labelPosition="left"
					checked={newFeatureToggle.enabled}
					onChange={() => setFeatureToggleIsEnabled(!newFeatureToggle.enabled)}
				/>
			</div>
			<div className="mt-8">
				{!editFeatureToggle && (
					<button className="border-2 border-blue-400 rounded-md p-3 bg-blue-100" type="button" onClick={() => handleCreateNewFeature()}>
						Create feature toggle
					</button>
				)}
				{editFeatureToggle && (
					<>
						<button
							className="border-2 border-blue-400 rounded-md p-3 bg-blue-100"
							type="button"
							onClick={() => handleEditFeatureToggle()}
						>
							Save changes
						</button>
						{changesWereMade() && (
							<button
								className="ml-4 border-2 border-gray-400 rounded-md p-3 bg-yellow-50"
								type="button"
								onClick={() => handleUndoChanges()}
							>
								Undo changes
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default CreateFeatureToggle;
