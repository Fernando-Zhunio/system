export interface Inewsletter {
    id: number;
    title: string;
    description: string;
    image: string;
    start_date: string;
    end_date: string;
    created_at?: string;
    updated_at?: string;
}

export interface InewsletterImplementation{
    title: string;
    urlEdit?: string;
    urlSave: string;

}
