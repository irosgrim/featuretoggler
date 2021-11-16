const features = `
-- Drop table

-- DROP TABLE public.features;

CREATE TABLE public.features (
	id serial4 NOT NULL,
	project_id varchar(50) NOT NULL,
	name varchar(50) NOT NULL,
	value varchar NULL,
	enabled bool NULL DEFAULT true,
	date_created timestamp NULL DEFAULT now(),
	CONSTRAINT features_fk FOREIGN KEY (project_id) REFERENCES public.projects(project_id)
);`;

const organizations = `
-- Drop table

-- DROP TABLE public.organizations;

CREATE TABLE public.organizations (
	id serial4 NOT NULL,
	organization_id varchar(100) NOT NULL,
	date_created timestamp NULL DEFAULT now(),
	CONSTRAINT organizations_pk PRIMARY KEY (organization_id)
);
`;

const projects = `
-- Drop table

-- DROP TABLE public.projects;

CREATE TABLE public.projects (
	id serial4 NOT NULL,
	project_id varchar(50) NOT NULL,
	date_created timestamp NULL DEFAULT now(),
	active bool NULL DEFAULT true,
	organization_id varchar(100) NULL,
	CONSTRAINT projects_pk PRIMARY KEY (project_id),
	CONSTRAINT projects_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(organization_id)
);

`;

const roles = `
-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id serial4 NOT NULL,
	"role" varchar(20) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (role)
);

`;

const userProjectPermissions = `
-- Drop table

-- DROP TABLE public.user_project_permissions;

CREATE TABLE public.user_project_permissions (
	id smallserial NOT NULL,
	project_id varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	is_admin bool NULL DEFAULT false,
	CONSTRAINT user_project_permissions_pk PRIMARY KEY (id),
	CONSTRAINT user_project_permissions_fk FOREIGN KEY (project_id) REFERENCES public.projects(project_id),
	CONSTRAINT user_project_permissions_fk_1 FOREIGN KEY (email) REFERENCES public.users(email)
);

`;

const users = `
-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
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
	CONSTRAINT users_fk FOREIGN KEY (organization_id) REFERENCES public.organizations(organization_id)
);

`;
