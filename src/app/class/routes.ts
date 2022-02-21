export const RDashboard = 'dashboard';
export const RDashboardVersusProducts = 'dashboard/versus/products';
export const RDashboardVersusCategories = 'dashboard/versus/categories';
export const RDashboardVersusLocations = 'dashboard/versus/brands';
export const RDashboardVersusCities = 'dashboard/versus/cities';
export const RHome = 'home';

export const RRrhhAppointments = 'rrhh/appointments';
export const RRrhhAppointmentNew =  (request, user) => `rrhh/appointments/request/${request}/user/${user}/create`;
export const RRrhhAppointmentEdit = (id, request, user) => `rrhh/appointments/${id}/request/${request}/user/${user}/edit`;
export const RRrhhAppointmentDelete = (id, request, user) => `rrhh/appointments/${id}/request/${request}/user/${user}/delete`;

export const RrhhDashboard = 'rrhh/dashboard';

export const RrhhWorks = 'rrhh/works';
export const RrhhWorksCreate = `rrhh/works/create`;
export const RrhhWorksEdit = (id) => `rrhh/works/${id}/edit`;
export const RrhhWorksDelete = (id) => `rrhh/works/${id}/delete`;

export const RrhhRequests = 'rrhh/requests';

export const RrhhUserWeb = 'rrhh/user-web';
// export const RrhhRequestsCreate = `rrhh/requests/create`;

export const RManagerCategories = 'manager/categories';
export const RManagerCategoriesCreate = `manager/categories/create`;
export const RManagerCategoriesEdit = (id) => `manager/categories/${id}/edit`;
export const RManagerCategoriesDelete = (id) => `manager/categories/${id}/delete`;

export const RManagerBrands = 'manager/brands';
export const RManagerBrandsCreate = `manager/brands/create`;
export const RManagerBrandsEdit = (id) => `manager/brands/${id}/edit`;
export const RManagerBrandsDelete = (id) => `manager/brands/${id}/delete`;

export const RManagerPrefixes = 'manager/prefixes';
export const RManagerPrefixesCreate = `manager/prefixes/create`;
export const RManagerPrefixesEdit = (id) => `manager/prefixes/${id}/edit`;
export const RManagerPrefixesDelete = (id) => `manager/prefixes/${id}/delete`;

export const RManagerProducts = 'manager/products';
export const RManagerProductsCreate = `manager/products/create`;
export const RManagerProductsEdit = (id) => `manager/products/${id}/edit`;
export const RManagerProductsDelete = (id) => `manager/products/${id}/delete`;

export const RCatalogProducts = 'catalog/products';

export const RPublications = 'publications';
export const RPublicationsCreate = `publications/create`;
export const RPublicationsEdit = (id) => `publications/${id}/edit`;
export const RPublicationsDelete = (id) => `publications/${id}/delete`;

export const RManagerCompanies = 'manager/companies';
export const RManagerCompaniesCreate = `manager/companies/create`;
export const RManagerCompaniesEdit = (id) => `manager/companies/${id}/edit`;
export const RManagerCompaniesDelete = (id) => `manager/companies/${id}/delete`;

export const RManagerCompaniesDepartments = (id) => `manager/companies/${id}/departments`;
export const RManagerCompaniesDepartmentsCreate = (id) => `manager/companies/${id}/departments/create`;
export const RManagerCompaniesDepartmentsEdit = (id, department) => `manager/companies/${id}/departments/${department}/edit`;
export const RManagerCompaniesDepartmentsDelete = (id, department) => `manager/companies/${id}/departments/${department}/delete`;

export const RManagerCompaniesDepartmentsPositions = (id, department) => `manager/companies/${id}/departments/${department}/positions`;
export const RManagerCompaniesDepartmentsPositionsCreate = (id, department) => `manager/companies/${id}/departments/${department}/positions/create`;
export const RManagerCompaniesDepartmentsPositionsEdit = (id, department, position) => `manager/companies/${id}/departments/${department}/positions/${position}/edit`;
export const RManagerCompaniesDepartmentsPositionsDelete = (id, department, position) => `manager/companies/${id}/departments/${department}/positions/${position}/delete`;

export const RManagerLocations = 'manager/locations';
export const RManagerLocationsCreate = `manager/locations/create`;
export const RManagerLocationsEdit = (id) => `manager/locations/${id}/edit`;
export const RManagerLocationsDelete = (id) => `manager/locations/${id}/delete`;

export const RManagerMl = 'manager/ml';
export const RManagerMlCreate = `manager/ml/create`;
export const RManagerMlEdit = (id) => `manager/ml/${id}/edit`;
export const RManagerMlDelete = (id) => `manager/ml/${id}/delete`;

export const RManagerCountries = 'manager/countries';
export const RManagerCountriesCreate = `manager/countries/create`;
export const RManagerCountriesEdit = (id) => `manager/countries/${id}/edit`;
export const RManagerCountriesDelete = (id) => `manager/countries/${id}/delete`;

export const RManagerCountriesCities = (id) => `manager/countries/${id}/cities`;
export const RManagerCountriesCitiesCreate = (id) => `manager/countries/${id}/cities/create`;
export const RManagerCountriesCitiesEdit = (id, city) => `manager/countries/${id}/cities/${city}/edit`;
export const RManagerCountriesCitiesDelete = (id, city) => `manager/countries/${id}/cities/${city}/delete`;

export const RManagerRoles = 'manager/roles';
export const RManagerRolesCreate = `manager/roles/create`;
export const RManagerRolesEdit = (id) => `manager/roles/${id}/edit`;
export const RManagerRolesDelete = (id) => `manager/roles/${id}/delete`;

export const RManagerUsers = 'manager/users';
export const RManagerUsersCreate = `manager/users/create`;
export const RManagerUsersEdit = (id) => `manager/users/${id}/edit`;
export const RManagerUsersDelete = (id) => `manager/users/${id}/delete`;

export const RManagerChatbot = 'manager/chatbot';
export const RManagerChatbotCreate = `manager/chatbot/create`;
export const RManagerChatbotEdit = (id) => `manager/chatbot/${id}/edit`;
export const RManagerChatbotDelete = (id) => `manager/chatbot/${id}/delete`;

export const RReportGeneralStock = 'report/general-stock';

export const RManagerPriceGroups = 'manager/price-groups';

export const RCatalogMl = 'catalog/ml';

export const RManagerNewsletters = 'manager/newsletters';
export const RManagerNewslettersCreate = `manager/newsletters/create`;
export const RManagerNewslettersEdit = (id) => `manager/newsletters/${id}/edit`;
export const RManagerNewslettersDelete = (id) => `manager/newsletters/${id}/delete`;

export const RManagerPermissionsAndGroups = 'manager/permissions-and-groups';
export const RManagerPermissionsAndGroupsCreate = `manager/permissions-and-groups/create`;
export const RManagerPermissionsAndGroupsEdit = (id) => `manager/permissions-and-groups/${id}/edit`;
export const RManagerPermissionsAndGroupsDelete = (id) => `manager/permissions-and-groups/${id}/delete`;

export const RManagerPeople = 'manager/people';
export const RManagerPeopleCreate = `manager/people/create`;
export const RManagerPeopleEdit = (id) => `manager/people/${id}/edit`;
export const RManagerPeopleDelete = (id) => `manager/people/${id}/delete`;

export const RManagerPrices = 'manager/prices';
export const RManagerPricesCreate = `manager/prices/create`;
export const RManagerPricesEdit = (id) => `manager/prices/${id}/edit`;
export const RManagerPricesDelete = (id) => `manager/prices/${id}/delete`;

export const RManagerPromotions = 'manager/promotions';
export const RManagerPromotionsCreate = `manager/promotions/create`;
export const RManagerPromotionsEdit = (id) => `manager/promotions/${id}/edit`;
export const RManagerPromotionsDelete = (id) => `manager/promotions/${id}/delete`;

export const RManagerVtexSites = 'manager/vtex-sites';
export const RManagerVtexSitesCreate = `manager/vtex-sites/create`;
export const RManagerVtexSitesEdit = (id) => `manager/vtex-sites/${id}/edit`;
export const RManagerVtexSitesDelete = (id) => `manager/vtex-sites/${id}/delete`;

export const RManagerWebhooks = 'manager/webhooks';
export const RManagerWebhooksCreate = `manager/webhooks/create`;
export const RManagerWebhooksEdit = (id) => `manager/webhooks/${id}/edit`;
export const RManagerWebhooksDelete = (id) => `manager/webhooks/${id}/delete`;










