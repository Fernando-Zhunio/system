export interface IOrder {
    id: number;
    type: string;
    client_id: string;
    channel_id: string;
    subtotal: string;
    discount: string;
    retention: string;
    tax: string;
    total: string;
    total_paid: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}
