CREATE TABLE IF NOT EXISTS organizations (
	id serial4 NOT NULL,
	organization_id varchar(100) NOT NULL,
	date_created timestamp NULL DEFAULT now(),
	CONSTRAINT organizations_pk PRIMARY KEY (organization_id)
);

CREATE TABLE IF NOT EXISTS roles (
	id serial4 NOT NULL,
	"role" varchar(20) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (role)
);

CREATE TABLE IF NOT EXISTS users (
	id serial4 NOT NULL,
	username varchar(20) NOT NULL,
	email varchar(50) NOT NULL,
	date_created timestamp NULL DEFAULT now(),
	last_access_date timestamp NOT NULL DEFAULT now(),
	"password" varchar(300) NOT NULL,
	organization_id varchar(50) NOT NULL,
	"role" varchar(20) NOT NULL,
	CONSTRAINT email_unique UNIQUE (email),
	CONSTRAINT users_pk PRIMARY KEY (id, username, email),
	CONSTRAINT users_un UNIQUE (email),
	CONSTRAINT users_username_unique UNIQUE (username),
	CONSTRAINT users_fk FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

CREATE TABLE IF NOT EXISTS projects (
	id serial4 NOT NULL,
	project_id varchar(50) NOT NULL,
	date_created timestamp NULL DEFAULT now(),
	active bool NULL DEFAULT true,
	organization_id varchar(100) NULL,
	CONSTRAINT projects_pk PRIMARY KEY (project_id),
	CONSTRAINT projects_fk FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

CREATE TABLE features (
	id serial4 NOT NULL,
	project_id varchar(50) NOT NULL,
	name varchar(50) NOT NULL,
	value varchar NULL,
	enabled bool NULL DEFAULT true,
	date_created timestamp NULL DEFAULT now(),
	CONSTRAINT features_fk FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE IF NOT EXISTS user_project_permissions (
	id smallserial NOT NULL,
	project_id varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	is_admin bool NULL DEFAULT false,
	CONSTRAINT user_project_permissions_pk PRIMARY KEY (id),
	CONSTRAINT user_project_permissions_fk FOREIGN KEY (project_id) REFERENCES projects(project_id),
	CONSTRAINT user_project_permissions_fk_1 FOREIGN KEY (email) REFERENCES users(email)
);

