import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

export const PERMISSIONS_MERCADO_LIBRE_ADMIN = {
    index: [PERMISSION_SUPER_ADMIN, 'ml.accounts.index'],
    show: [PERMISSION_SUPER_ADMIN, 'ml.accounts.show'],
    create: [PERMISSION_SUPER_ADMIN, 'ml.accounts.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'ml.accounts.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'ml.accounts.destroy'],
}