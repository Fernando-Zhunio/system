import { PERMISSION_SUPER_ADMIN } from './../../../../core/class/constants';
export  const PERMISSIONS_PRICES_GROUP = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.prices.groups.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.prices.groups.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.prices.groups.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.prices.groups.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.prices.groups.destroy'],
  }