import {RootState} from "../RootStore";

export const selectJobs = (state: RootState) => state.jobMap.jobs;

export const selectIsLoading = (state: RootState) => state.jobMap.isLoading;
