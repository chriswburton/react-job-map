import React, { FC } from 'react';
import GoogleMap from './GoogleMap';
import Jobs from './Jobs';
import MapStyle from "../MapStyle";
import { connect } from 'react-redux';
import {RootState} from "../../RootStore";
import {selectJobs} from "../selectors";

const JobMap: FC = ({ jobs }: any) => <>
    <GoogleMap
        lat={51.5}
        lng={-0.1}
        jobs={[]}
        styles={MapStyle}
    />
    <Jobs />
</>;

const mapStateToProps = (state: RootState) => ({
    jobs: selectJobs(state)
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobMap);
