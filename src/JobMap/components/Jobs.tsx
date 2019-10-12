import React from 'react';
import JobModel from "../models/JobModel";
import JobCard from "./JobCard";
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const JobsContainer = styled('div')`
    ${tw`flex p-4 h-full overflow-scroll`}
`;

interface JobsProps {
    jobs: JobModel[]
};

const Jobs: React.FC<JobsProps> = ({ jobs }) => <JobsContainer>
    {jobs.map((job: JobModel, index) => <JobCard
        key={index}
        job={job}
    />)}
</JobsContainer>;

export default Jobs;
