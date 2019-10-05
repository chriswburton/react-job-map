import React, { FC } from 'react';
import GoogleMap from './GoogleMap';
import Jobs from './Jobs';

const JobMap: FC = () => <>
    <GoogleMap
        lat={51.5}
        lng={-0.1}
        jobs={[]}
    />
    <Jobs />
</>;

export default JobMap;
