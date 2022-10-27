export interface Import {
    id: number;
    code: string;
    note?: string;
    import_origin_sequence_id: number;
    import_log_status_id: number;
    estimated_date_first?: string;
    estimated_date_last?: string;
    arrival_date?: string;
    created_at: string;
    updated_at: string;
    note_plain_text: string;
    sequence: Sequence;
}

interface Sequence {
    id: number;
    sequence_number: number;
    import_origin_id: number;
    import_id: number;
    created_at: string;
    updated_at: string;
}