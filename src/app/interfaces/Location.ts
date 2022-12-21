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
    mba_code: string;
    city: {
        id: number;
        name: string;
    };
    company: {
        id: number;
        name: string;
    };
    schedules: Schedules,
    phone: string,
    postal_code: string,
    reference: string
}

export type Schedules  = {
    [key: string]: {
        status: boolean,
        start: string,
        end: string
    }
}

