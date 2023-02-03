import { PERMISSION_SUPER_ADMIN } from './../../../../../core/class/constants';
export const PERMISSION_CAMPAIGNS = {
    index: [PERMISSION_SUPER_ADMIN, 'catalogs.campaigns.index'],
    create: [PERMISSION_SUPER_ADMIN, 'catalogs.campaigns.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'catalogs.campaigns.edit'],
    destroy: [PERMISSION_SUPER_ADMIN, 'catalogs.campaigns.destroy'],
}
 
export const PERMISSIONS_PROMOTIONS = {
    index: [PERMISSION_SUPER_ADMIN,'catalogs.promotions.index'],
    create: [PERMISSION_SUPER_ADMIN, 'catalogs.promotions.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'catalogs.promotions.edit'],
    destroy: [PERMISSION_SUPER_ADMIN, 'catalogs.promotions.destroy'],
}