export interface HistoryPriceProduct {
    id: number;
    price: number;
    price_with_tax: number;
    duration_type: string;
    start_date?: string;
    end_date?: string;
    status: string;
    action: string;
    product_id?: any;
    price_group_id: number;
    tax_group_id: number;
    created_at: string;
    updated_at: string;
    full_price_formated: string;
}