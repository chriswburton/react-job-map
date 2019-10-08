interface Job {
    title: string;
    description: string;
    salary: string;
    locationStr: string;
    locationCoords: {
        lat: number;
        lng: number;
    }
    dateAdded: Date
}

class JobModel implements Job {
    title = 'No title provided';
    description = 'No job description provided';
    salary = 'Unknown';
    locationStr = 'UK';
    locationCoords = { lat: 0, lng: 0 };
    dateAdded = new Date();
}

export default JobModel;
