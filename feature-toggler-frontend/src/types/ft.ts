export type Project = {
    project_id: string;
    project_name: string;
    active: boolean;
    date_created: Date;
}

export type Feature = {
    project_id: string;
    project_name: string;
    feature_id: string | number;
    feature_name: string;
    feature_value: string;
    feature_enabled: boolean;
    feature_description: string | null;
    date_created: Date;
}

export type ServerFeatureChangeResponse = {
    feature_id: string;
    feature_name: string;
    feature_value: any;
    feature_enabled: boolean;
}

export type AppState = {
    projects: Project[];
    features: Feature[];
}

export type Action = {
    type: string;
    payload: any;
}
