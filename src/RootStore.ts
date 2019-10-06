import { combineReducers, createStore } from 'redux';
import {JobMapState} from "./JobMap/state";
import JobMapReducer from "./JobMap/reducer";

export interface RootState {
    jobMap: JobMapState
};

const rootReducer = combineReducers<RootState>({
    jobMap: JobMapReducer
});

export default createStore(rootReducer);
