import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

export const COMPANIES_PERMISSIONS = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.companies.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.companies.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.companies.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.companies.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.companies.destroy'],
  }