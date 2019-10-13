import React, {ComponentClass, FC, Ref, useRef, useState} from 'react';
import {GoogleMap, withGoogleMap, withScriptjs, WithScriptjsProps} from 'react-google-maps';
import {WithGoogleMapProps} from 'react-google-maps/lib/withGoogleMap';
import {JobModel} from "../models";
import {trackAction} from "../../common";
import GoogleMapMarker from "./GoogleMapMarker";

const INITIAL_ZOOM  = 10;
const API_KEY       = 'AIzaSyB5MghxvalpNlEQVq4sO3nrDDqJEEgKI30';
const MAP_URL       = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`;

interface MapStyleRule {
    featureType: string;
    elementType: string;
    stylers: Array<{[x: string]: any }>
};

interface MapArgs {
    lat?: number;
    lng?: number;
    jobs?: JobModel[],
    styles?: MapStyleRule[]
};

const MapContainer: FC<MapArgs> = ({ lat = 51.44, lng = -2.60, jobs = [], styles = null }) => {
    const mapRef: Ref<GoogleMap | any> = useRef(null);
    const [zoom, setZoom] = useState(INITIAL_ZOOM);

    const onZoomChangeHandler = () => {
        const newZoomLevel = mapRef.current.getZoom();
        if (newZoomLevel !== zoom) {
            const label = newZoomLevel < zoom ? 'Out' : 'In';
            trackAction('Job Map', 'Zoom', label);
            setZoom(newZoomLevel);
        }
    };

    return <GoogleMap
        key={lat + lng}
        ref={mapRef}
        defaultCenter={{ lat, lng }}
        defaultZoom={INITIAL_ZOOM}
        options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles,
            minZoom: 9,
            maxZoom: 11
        }}
        onZoomChanged={onZoomChangeHandler}
    >
        {jobs.map((job: JobModel, index: number) => <GoogleMapMarker
            key={index}
            lat={job.locationCoords.lat}
            lng={job.locationCoords.lng}
            searchLat={lat}
            searchLng={lng}
        />)}
    </GoogleMap>;
}

const MapElem: ComponentClass<WithGoogleMapProps & WithScriptjsProps & MapArgs & any> = withScriptjs(
    withGoogleMap<WithGoogleMapProps>(
        MapContainer as FC
    )
);
const loadingElement = <div style={{height: '100%'}} />;
const containerElement = <div style={{height: '100%'}} />;
const mapElement = <div style={{height: '100%'}} />;

const Map: FC<MapArgs> = ({ lat, lng, jobs, styles }) => <MapElem
    loadingElement={loadingElement}
    containerElement={containerElement}
    googleMapURL={MAP_URL}
    mapElement={mapElement}
    lat={lat}
    lng={lng}
    jobs={jobs}
    styles={styles}
/>;

export default Map;
