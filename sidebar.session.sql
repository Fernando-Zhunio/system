create table if not exists group_permissions (
    id INTEGER primary key ,
    name varchar(255) not null,
    slug varchar(255) NULL
);
create table if not exists itemNav (
  id INTEGER primary key ,
  name varchar(255) not null,
  url varchar(255) not  null,
  icon varchar(255)  null,
  permission varchar(255) not null,
  group_permission_id INTEGER not null,
  foreign key (group_permission_id) references group_permissions (id)

);
create table if not exists optionsSidebar (
  id INTEGER primary key  ,
  name varchar(255) not null,
  value VARCHAR(255) not null
);
insert into group_permissions (name, slug) values ('Inicio', 'home');
insert into group_permissions (name, slug) values ('Recursos Humanos', 'rrhh');
insert into group_permissions (name, slug) values ('Administración de Productos', 'admin_products');
insert into group_permissions (name, slug) values ('Catálogos', 'catalogs');
insert into group_permissions (name, slug) values ('Importaciones', 'imports');
insert into group_permissions (name, slug) values ('Reportes', 'reports');
insert into group_permissions (name, slug) values ('Ordenes', 'orders');
insert into group_permissions (name, slug) values ('Información General', 'info_general');
insert into group_permissions (name, slug) values ('Administración del Sistema', 'admin_system');
insert into group_permissions (name, slug) values ('Otros', 'others');