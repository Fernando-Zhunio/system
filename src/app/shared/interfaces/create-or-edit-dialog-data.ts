import { StatusCreateOrEdit } from "../enums/status-create-or-edit";

export type CreateOrEditDialogData = {
    status: StatusCreateOrEdit;
    info?: any;
    id?: number | string;
    multiId?: MultiId;
}

type MultiId = {
    [key: string]: number;
}

