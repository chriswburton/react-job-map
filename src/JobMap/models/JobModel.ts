interface Job {
    readonly title: string;
    readonly description: string;
    readonly salary: string;
    readonly locationStr: string;
    readonly locationCoords: {
        readonly lat: number;
        readonly lng: number;
    }
    readonly dateAdded: Date
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
