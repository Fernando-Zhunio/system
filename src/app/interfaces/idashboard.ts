import { ChartDataset, ChartOptions } from 'chart.js';

export interface IheaderDashboard {
    sales_total: IsalesHeader;
    sales_average: IsalesHeader;
    sales_count: IsalesHeader;
    products_sold_count: IsalesHeader;
}

export interface IsalesHeader {
    total: number;
    previous: number;
    growth: number;
    growth_percentage: number;
}

export interface ItopDashboard<T> {
    _total: number;
    key: string;
    period_type: string;
    date: string;
    model: string;
    model_id: number;
    total: number;
    average: number;
    highest: number;
    lowest: number;
    created_at: string;
    updated_at: string;
    statisticable: T;
}

export interface IstatisticableProduct {
    id: number;
    name: string;
    description: string;
    user_id: number;
    brand_id: number;
    category_id: number;
    sequence_id: number;
    prefix_id: number;
    code: string;
    available: number;
    code_alt: string;
    old_code: null;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    last_prices: [];
}

export interface IcompareGraph {
    date: string;
    total: number;
    average: number;
    lowest: number;
    highest: number;
}

export interface IstatisticableLocation {
    id: number;
    name: string;
    type: string;
    address: string;
    latitude: string;
    longitude: string;
    mba_code: string;
    city_id: number;
    company_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface IsellForCategories {
    created_at: string;
    deleted_at: string;
    id: number;
    name: string;
    sort_name: string;
    updated_at: string;
}

export interface Ichart {
    labels: any[];
    // type: Type;
    isLegend: boolean;
    colors?: [{ backgroundColor: string[] }];
    plugins?: any;
    dataSet: ChartDataset[] | number[];
    option?: ChartOptions;
}

export interface IsellForCity {
    avg: number;
    total: number;
    locations_number: number;
    city: {
        id: number;
        name: string;
        code: string;
        country_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string;
    };
}

export interface Idates{
    end_date: string;
        period: any;
        prev_end_date: string;
        prev_start_date: string;
        start_date: string;
}

// regex number = [1-9]\d*(\.\d+)?,$
// regex string = :\s".+

