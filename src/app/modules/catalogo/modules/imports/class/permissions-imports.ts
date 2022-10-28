import { PERMISSION_SUPER_ADMIN } from "../../../../../core/class/constants";

const PERMISSION_IMPORTS_INDEX = 'catalogs.imports.index';
const PERMISSION_IMPORTS_CREATE = 'catalogs.imports.create';
const PERMISSION_IMPORTS_EDIT = 'catalogs.imports.edit';
const PERMISSION_IMPORTS_DESTROY = 'catalogs.imports.destroy';

export const PERMISSIONS_IMPORTS = {
    index: [PERMISSION_IMPORTS_INDEX, PERMISSION_SUPER_ADMIN],
    create: [PERMISSION_IMPORTS_CREATE, PERMISSION_SUPER_ADMIN],
    edit: [PERMISSION_IMPORTS_EDIT, PERMISSION_SUPER_ADMIN],
    destroy: [PERMISSION_IMPORTS_DESTROY, PERMISSION_SUPER_ADMIN],
};