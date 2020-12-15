export interface IProducts {
    current_page:number,
    data:Array<IProduct>,
    first_page_url:string,
    from:number,
    last_page:number,
    last_page_url:string, 
    next_page_url:string,
    path: string,
    per_page:number,
    prev_page_url?: string,
    to:number,
    total: number
}

interface IProduct{
    id: number,
    name: string,
    description: string,
    user_id: number,
    category_id: number,
    brand_id: number,
    sequence_id: number,
    prefix_id: number,
    code: string,
    available: number,
    code_alt: string,
    old_code: string|null,
    created_at: string,
    updated_at: string,
    deleted_at: string|null,
    last_prices: [],
    prestashop_products:[],
    ml_infos: []
}
