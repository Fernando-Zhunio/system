export interface INewsLetter {
    id: number;
    title: string;
    description: string;
    image: string;
    start_date: string;
    end_date: string;
    created_at?: string;
    updated_at?: string;
}