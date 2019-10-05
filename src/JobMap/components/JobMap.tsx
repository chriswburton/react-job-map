import React, { FC } from 'react';
import GoogleMap from './GoogleMap';
import Jobs from './Jobs';
import MapStyle from "../MapStyle";

const JobMap: FC = () => <>
    <GoogleMap
        lat={51.5}
        lng={-0.1}
        jobs={[]}
        styles={MapStyle}
    />
    <Jobs />
</>;

export default JobMap;
