import { PERMISSION_SUPER_ADMIN } from './../../../../../core/class/constants';
 export const PERMISSIONS_PUBLICATIONS = {
    index: [PERMISSION_SUPER_ADMIN, 'catalogs.publications.index'],
    show: [PERMISSION_SUPER_ADMIN, 'catalogs.publications.show'],
    create: [PERMISSION_SUPER_ADMIN, 'catalogs.publications.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'catalogs.publications.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'catalogs.publications.destroy']
  }