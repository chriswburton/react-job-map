import React, { FC } from 'react';
import useAsyncEffect from 'use-async-effect';
import GoogleMap from './GoogleMap';
import Jobs from './Jobs';
import MapStyle from '../MapStyle';
import { useSelector, useDispatch } from 'react-redux';
import {selectJobs} from '../selectors';
import {fetchedJobs, fetchingJobs} from '../actions';
import JobModel from '../models/JobModel';
import {plainToClass} from 'class-transformer';

const API_GATEWAY = 'https://zw6sclhxk2.execute-api.eu-west-1.amazonaws.com/Dev';

const JobMap: FC = () => {
    const jobs: JobModel[] = useSelector(selectJobs);
    const dispatch = useDispatch();
    useAsyncEffect(async () => {
        dispatch(fetchingJobs());
        const response = await fetch(`${API_GATEWAY}/jobs`);
        const jobsJSON = await response.json();
        const jobs: JobModel[] = jobsJSON
            .map((job: any) => plainToClass(JobModel, job));
        dispatch(fetchedJobs(jobs));
    }, []);

    return <>
        <GoogleMap
            lat={51.5}
            lng={-0.1}
            jobs={jobs}
            styles={MapStyle}
        />
        <Jobs />
    </>;
};

export default JobMap;
