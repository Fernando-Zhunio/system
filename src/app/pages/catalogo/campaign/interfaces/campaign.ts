import { Promotion } from "./promotion";

export interface Campaign {
    id: number;
    title: string;
    description: string | null;
    duration_type: 'undefined' | 'date_range',
    status: 'active' | 'inactive',
    start_date: string;
    end_date: string;
    created_at: string;
    promotions: Promotion[];
    updated_at: string;
}