import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

export const PERMISSION_PEOPLE =  {
    index: [PERMISSION_SUPER_ADMIN, 'admin.people.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.people.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.people.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.people.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.people.destroy'],
  }
