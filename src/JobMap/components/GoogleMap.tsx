import React, { ComponentClass, FC } from 'react';
import {GoogleMap, withGoogleMap, withScriptjs, WithScriptjsProps} from 'react-google-maps';
import {WithGoogleMapProps} from 'react-google-maps/lib/withGoogleMap';
import {JobModel} from "../models";

const INITIAL_ZOOM  = 11;
const API_KEY       = 'AIzaSyB5MghxvalpNlEQVq4sO3nrDDqJEEgKI30';
const MAP_URL       = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`;

interface MapArgs {
    lat: number;
    lng: number;
    jobs: JobModel[]
};

const MapContainer: FC<MapArgs> = ({ lat, lng, jobs }) => <GoogleMap
    key={lat + lng}
    defaultCenter={{ lat, lng }}
    defaultZoom={INITIAL_ZOOM}
    options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
    }}
></GoogleMap>;

const MapElem: ComponentClass<WithGoogleMapProps & WithScriptjsProps & any> = withScriptjs(
    withGoogleMap<WithGoogleMapProps>(
        MapContainer as FC
    )
);
const loadingElement = <div />;
const containerElement = <div style={{height: '100vh'}} />;
const mapElement = <div style={{height: '100vh'}} />;

const Map: FC<MapArgs> = ({ lat = 51.5, lng = -0.1, jobs = [] }) => <MapElem
    loadingElement={loadingElement}
    containerElement={containerElement}
    googleMapURL={MAP_URL}
    mapElement={mapElement}
    lat={lat}
    lng={lng}
    jobs={jobs}
/>;

export default Map;
