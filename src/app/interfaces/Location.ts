export interface Location {
    id: number;
    name: string;
    type: string;
    address: string;
    latitude: string;
    longitude: string;
    city_id: number;
    company_id: string;
    created_at: string;
    status: string;
    city: {
        id: number;
        name: string;
    };
    company: {
        id: number;
        name: string;
    };
    schedules: any
}

interface Schedules {
    [key: string]: {
        status: boolean,
        start: string,
        end: string
    }
}

