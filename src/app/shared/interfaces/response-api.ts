export interface ResponseApi<T> {
    success: boolean;
    data: T
}

export interface ResponsePaginateApi<T> extends ResponseApi<PaginateApi<T>> {}

export interface PaginateApi<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    link: any[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}