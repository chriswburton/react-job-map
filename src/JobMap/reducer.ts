import JobModel from "./models/JobModel";
import {initialState, JobMapState} from "./state";

interface Action {
    type: string;
    payload?: JobModel[]
};

const JobMapReducer = (state: JobMapState = initialState, action: Action): JobMapState => {
    return {
        isLoading: false,
        error: null,
        jobs: []
    };
};

export default JobMapReducer;
