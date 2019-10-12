import React from 'react';
import JobModel from "../models/JobModel";
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const CardContainer = styled('div')`
    ${tw`flex-none h-full border rounded p-4 mr-4`}
    width: 350px;
`;
const JobTitle = styled('h3')`${tw`text-lg pb-2`}`;
const JobSalary = styled('p')`${tw`text-md pb-4`}`;
const JobDescription = styled('p')`${tw`text-sm`}`;
const DateAdded = styled('p')`${tw`text-xs pt-6`}`;

interface JobCardProps {
    job: JobModel;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const { title, salary, description, dateAdded } = job;
    const descriptionStr = description.length > 100
        ? `${description.slice(0, 100)}...`
        : description;
    const dateStr = new Date(dateAdded).toLocaleDateString();

    return <CardContainer>
        <JobTitle>{title}</JobTitle>
        <JobSalary>{salary}</JobSalary>
        <JobDescription>{descriptionStr}</JobDescription>
        <DateAdded>{dateStr}</DateAdded>
    </CardContainer>;
};

export default JobCard;
