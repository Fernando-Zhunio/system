export interface IClientAddressOrder {
    id: number;
    first_name: string;
    last_name: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code?: string;
    client_id: number;
    created_at: string;
    updated_at: string;
}
