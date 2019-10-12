import React, { FC, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import GoogleMap from './GoogleMap';
import Jobs from './Jobs';
import MapStyle from '../MapStyle';
import { useSelector, useDispatch } from 'react-redux';
import {selectJobs} from '../selectors';
import {fetchedJobs, fetchingJobs} from '../actions';
import JobModel from '../models/JobModel';
import {plainToClass} from 'class-transformer';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import FontAwesome from 'react-fontawesome';

const API_GATEWAY = 'https://zw6sclhxk2.execute-api.eu-west-1.amazonaws.com/Dev';

const UIWrapper = styled('div')`
    ${tw`flex flex-col w-full h-full`}
`;
const MapContainer = styled('div')`
    ${tw`relative w-full`}
    // open issue with 'flex-grow'
    // https://github.com/bradlc/babel-plugin-tailwind-components/issues/32
    flex-grow: 1;
`;
const JobsContainer = styled('div')`
    ${tw`flex-none w-full left-0 z-30 overflow-hidden`}
    height: 300px;
`;
const JobsVisibilityToggle = styled('div')`
    ${tw`hidden sm:block absolute bottom-0 bg-white py-2 px-4 cursor-pointer`}
    left: calc(50% - 80px);
`;
const ToggleMessage = styled('span')`
    ${tw`pl-2`}
`;

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

    // no sense managing local component state in Redux
    const [showJobs, setShowJobs] = useState<boolean>(true);
    const toggleJobsVisibility = () => setShowJobs(!showJobs);

    return <UIWrapper>
        <MapContainer>
            <GoogleMap
                lat={51.44}
                lng={-2.60}
                jobs={jobs}
                styles={MapStyle}
            />
            <JobsVisibilityToggle
                onClick={toggleJobsVisibility}
            >
                <FontAwesome name={showJobs ? 'chevron-down' : 'chevron-up'} />
                <ToggleMessage>{!showJobs ? 'Show Jobs' : 'Hide Jobs'}</ToggleMessage>
            </JobsVisibilityToggle>
        </MapContainer>
        {showJobs && <>
            <JobsContainer>
                <Jobs
                    jobs={jobs}
                />
            </JobsContainer>
        </>}
    </UIWrapper>;
};

export default JobMap;
