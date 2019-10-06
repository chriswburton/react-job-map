import {RootState} from "../RootStore";

export const selectJobs = (state: RootState) => state.jobMap.jobs;
