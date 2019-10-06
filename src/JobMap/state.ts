import JobModel from "./models/JobModel";

export interface JobMapState {
    readonly isLoading: boolean;
    readonly error: string | null;
    readonly jobs: JobModel[];
};

export const initialState: JobMapState = {
    isLoading: false,
    error: null,
    jobs: []
};
