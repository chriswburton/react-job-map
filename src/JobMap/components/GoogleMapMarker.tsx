import React, {FC} from 'react';
import {trackAction} from '../../common';
import Marker from 'react-google-maps/lib/components/Marker';

interface DistanceCategory {
    threshold: number;
    label: string;
}

// 1 degree is approx 69 miles
const ONE_MILE = 0.01449275362;
const DISTANCE_CATEGORIES: DistanceCategory[] = [
    { threshold: 0, label: '0-5 miles away' },
    { threshold: 5, label: '5-10 miles away' },
    { threshold: 10, label: '10-20 miles away' },
    { threshold: 20, label: '20+ miles away' }
];

interface MarkerProps {
    lat: number;
    lng: number;
    searchLat: number;
    searchLng: number;
};

interface MarkerClickPayload {
    latLng: {
        lat: Function;
        lng: Function;
    }
};

const GoogleMapMarker: FC<MarkerProps> = ({ lat, lng, searchLat, searchLng }) => {
    const markerClickHandler = ({ latLng }: MarkerClickPayload) => {
        // we'll track how far away the user is viewing
        // we'll break it into bands to categorise
        const distanceLat = (latLng.lat() - searchLat);
        const distanceLng = (latLng.lng() - searchLng);
        const distanceSqd = Math.pow(distanceLat,2) + Math.pow(distanceLng,2);
        const distance = Math.sqrt(distanceSqd);
        const distanceInMiles = distance / ONE_MILE;
        const categoryMatch = DISTANCE_CATEGORIES
            .slice()
            .reverse()
            .find((category: DistanceCategory) => distanceInMiles >= category.threshold);
        const label = categoryMatch ? categoryMatch.label : 'Unknown';
        trackAction('Job Map', 'View Marker', label);
    };

    return <Marker
        position={{lat, lng}}
        onClick={markerClickHandler}
    />
};

export default GoogleMapMarker;
