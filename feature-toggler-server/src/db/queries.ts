export const getOrganization = `
	SELECT organization_id
	FROM organizations
	WHERE organization_id = $1;
`;

export const getUserByEmail = `
	SELECT username, email, organization_id, role
	FROM users
	WHERE email = $1;
`;

export const getUserByUsername = `
	SELECT username, email, organization_id, role
	FROM users
	WHERE username = $1;
`;

export const createOrganization = `
	INSERT INTO organizations (organization_id)
	VALUES ($1)
	RETURNING *;
`;

export const createUser = `
	INSERT INTO users (username, email, password, organization_id, role)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING username, email, organization_id, role;
`;

export const selectProject = `
	SELECT * FROM projects
	WHERE project_id = $1;
`;

export const selectProjectForUser = `
	SELECT 
		project_id,
		p.project_name,
		p.date_created,
		p.active 
	FROM user_project_permissions upp
	INNER JOIN projects p USING(project_id)
	WHERE email=$1 AND project_id = $2;
`;

export const selectAllProjectsForUser = `
	SELECT 
		project_id,
		p.project_name,
		p.date_created,
		p.active 
	FROM user_project_permissions upp
	INNER JOIN projects p USING(project_id)
	WHERE email=$1
	ORDER BY p.date_created ASC;
`;

export const newProjectForUser = `
	INSERT INTO projects (project_id, project_name, active, organization_id)
	VALUES ($1, $2, $3, $4);
`;

export const newUserProjectPermissions = `
	INSERT INTO user_project_permissions (project_id, email, is_admin)
	VALUES ($1, $2, $3);
`;

export const selectAllFeaturesForUser = `
	SELECT
		upp.project_id,
		p.project_name,
		f.id as feature_id,
		f."name" as feature_name,
		f.value as feature_value,
		f.enabled as feature_enabled,
		f.description as feature_description,
		f.date_created 
	FROM user_project_permissions upp
	INNER JOIN features f USING(project_id)
	INNER JOIN projects p USING(project_id)
	WHERE email=$1
	ORDER BY f.date_created ASC;
`;

export const selectAllFeaturesFromProject = `
	SELECT
		upp.project_id,
		p.project_name,
		f.id as feature_id,
		f."name" as feature_name,
		f.value as feature_value,
		f.enabled as feature_enabled,
		f.description as feature_description,
		f.date_created 
	FROM user_project_permissions upp
	INNER JOIN features f USING(project_id)
	INNER JOIN projects p USING(project_id)
	WHERE email=$1 AND project_id = $2
	ORDER BY f.date_created ASC;
`;

export const getAllFeaturesFromProject = `
	SELECT 
		"name" as feature_name,
		"value" as feature_value,
		enabled as feature_enabled,
		date_created
	FROM features
	WHERE project_id = $1
	ORDER BY date_created ASC;
`;

export const getProjectById = `
	SELECT project_id
	FROM projects
	WHERE project_id = $1;
`;

export const toggleFeature = `
	UPDATE features
	SET enabled = $1
	WHERE 
		project_id = $2 AND name = $3
	RETURNING 
		id as feature_id,
		project_id,
		name as feature_name,
		value as feature_value,
		enabled as feature_enabled,
		description as feature_description,
		date_created;
`;

export const deleteFeatureById = `
	DELETE 
	FROM features
	WHERE project_id = $1 and name = $2;
`;

export const getFeatureStateById = `
	SELECT 
		id as feature_id,
		project_id,
		name as feature_name,
		value as feature_value,
		enabled as feature_enabled,
		description as feature_description,
		date_created
	FROM features
	WHERE project_id = $1 AND name = $2;
`;


export const newFeature = `
	INSERT INTO features (project_id, name, value, enabled, description)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING
		id as feature_id,
		project_id,
		name as feature_name,
		value as feature_value,
		enabled as feature_enabled,
		description as feature_description,
		date_created
	;
`;

export const getUserPermissionsForProject = `
	SELECT is_admin from user_project_permissions
	WHERE project_id = $1
	AND email = $2
`;

export const deleteAllPermissionsForProject = `
	DELETE FROM user_project_permissions
	WHERE project_id = $1;
`;

export const deleteAllFeaturesThatBelongToProject = `
	DELETE FROM features
	WHERE project_id = $1;
`;

export const deleteProject = `
	DELETE FROM projects
	WHERE project_id = $1;
`;

