# Novisolutions
### Definición de rutas api
 - Se guardaran en una carpeta con nombre **{name}-routes-api.ts**  
 - Se exportaran como constantes (string | function) con el nombre **{NAME}_ROUTES_API_{VARIANTE}**

### Estructura de carpetas
- Por cada modulo se creara una carpeta con el nombre del modulo

Ejemplo: 

    Locations
      locations.module.ts
      locations.routing.ts
      routes-api
          locations.routes-api.ts
      permissions
          locations.permissions.ts
      pages
          index-locations.page.ts
          create-locations.page.ts
          edit-locations.page.ts
      components
          locations-list.component.ts
          locations-form.component.ts
      services
          locations.service.ts
      interfaces
          locations.interface.ts
      tools
          locations-tools.ts
      modules
          locations-city
              pages
                  index-locations-city.page.ts
                  create-locations-city.page.ts
                  edit-locations-city.page.ts
              components
                  locations-city-list.component.ts
                  locations-city-form.component.ts
              services
                  locations-city.service.ts
              interfaces
                  locations-city.interface.ts
              tools
                  locations-city-tools.ts


### Reductores
  
  - Preferencias
  - Notificaciones  
  - Precios
  