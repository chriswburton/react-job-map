import JobModel from "./models/JobModel";

interface Action {
    type: string;
    payload?: any;
}

export enum ActionTypes {
    FETCHING_JOBS = '[JobMap] Fetching Jobs',
    FETCHED_JOBS = '[JobMap] Fetched Jobs'
}

interface FetchingJobs extends Action {
    type: ActionTypes.FETCHING_JOBS;
}

interface FetchedJobs extends Action {
    type: ActionTypes.FETCHED_JOBS;
    payload: JobModel[];
}

export const fetchingJobs = (): FetchingJobs => ({
    type: ActionTypes.FETCHING_JOBS
});

export const fetchedJobs = (payload: JobModel[]): FetchedJobs => ({
    type: ActionTypes.FETCHED_JOBS,
    payload
});

export type JobActions = FetchedJobs | FetchingJobs;
