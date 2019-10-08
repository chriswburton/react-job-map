import {initialState, JobMapState} from "./state";
import {ActionTypes, JobActions} from "./actions";

const JobMapReducer = (state: JobMapState = initialState, action: JobActions): JobMapState => {
    switch (action.type) {
        case ActionTypes.FETCHING_JOBS:
            return {...state, jobs: []};
        case ActionTypes.FETCHED_JOBS:
            return {...state, jobs: [...action.payload]};
        default:
            return state;
    }
};

export default JobMapReducer;
