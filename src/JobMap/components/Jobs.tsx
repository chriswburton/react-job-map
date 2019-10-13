import React, {Ref, useRef} from 'react';
import JobModel from "../models/JobModel";
import JobCard from "./JobCard";
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import FontAwesome from "react-fontawesome";

const JobsContainer = styled('div')`
    ${tw`flex p-4 h-full overflow-scroll`}
`;

const JobListingPaddle = styled('div')`
    ${tw`hidden lg:block opacity-25 hover:opacity-100 shadow-none hover:shadow-md absolute w-16 p-6 mx-10 my-24 text-center rounded cursor-pointer bg-blue-400`}
    transition-duration: 0.4s;
    :last-of-type {
        ${tw`right-0`}
    }
`;

interface JobsProps {
    jobs: JobModel[]
};

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
    const containerRef: Ref<HTMLDivElement | any> = useRef(null);
    const scrollContainer = (scrollLeft: boolean) => {
        containerRef.current.scrollLeft = scrollLeft
            ? containerRef.current.scrollLeft - 250
            : containerRef.current.scrollLeft + 250;
    }
    return <JobsContainer ref={containerRef}>
        {jobs.map((job: JobModel, index: number) => <JobCard
            key={index}
            job={job}
        />)}
        <JobListingPaddle onClick={() => scrollContainer(true)}><FontAwesome name="chevron-left" /></JobListingPaddle>
        <JobListingPaddle onClick={() => scrollContainer(false)}><FontAwesome name="chevron-right" /></JobListingPaddle>
    </JobsContainer>;
};

export default Jobs;
