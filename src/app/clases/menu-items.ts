import { NgxPermissionsService } from "ngx-permissions";

export class MenuItems {

    public  LIST_TYPE_FREE = 'free';
    public  LIST_TYPE_SILVER = 'silver';
    public  LIST_TYPE_GOLD = 'gold';
    public  RELIST_FOREVER_ON = 'on';
    public  RELIST_FOREVER_OFF = 'off';
    private menuItems = [
        {
            'type' : 'assign',
            'label' : 'Reasignar producto',
            'icon' : 'compare_arrows',
            'slug' : 'catalogs.products.ml.assign',
            'id' : 'assign-ml-product',
        },
        {
            'type' : 'relist',
            'label' : 'Republicar',
            'icon' : 'refresh',
            'slug' : 'catalogs.products.ml.relist',
            'id' : 'relist-ml-product',
            'status_required' : 'closed'
        },
        {
            'type' : 'active',
            'label' : 'Activar',
            'icon' : 'play_arrow',
            'slug' : 'catalogs.products.ml.status.update',
            'id' : 'update-status-ml-product',
            'status_required' : 'paused'
        },

        {
            'type' : 'paused',
            'label' : 'Pausar',
            'icon' : 'pause',
            'slug' : 'catalogs.products.ml.status.update',
            'id' : 'update-status-ml-product',
            'status_required' : 'active'
        },

        {
            'type' : 'closed',
            'label' : 'Finalizar',
            'icon' : 'stop',
            'slug' : 'catalogs.products.ml.status.update',
            'id' : 'update-status-ml-product',
            'status_required' :  ['active','paused']
        },


        {
            'type' : 'deleted',
            'label' : 'Eliminar',
            'icon' : 'delete',
            'slug' : 'catalogs.products.ml.destroy',
            'id' : 'update-status-ml-product',
        },


        {
            'type' : 'relist_forever_on',
            'label' : 'Activar Republicación Automática',
            'icon' : 'restore',
            'slug' : 'catalogs.products.ml.relist',
            'id' : 'update-status-ml-product',
            'relist_forever_required' : this.RELIST_FOREVER_OFF,
        },


        {
            'type' : 'relist_forever_off',
            'label' : 'Desactivar Republicación Automática',
            'icon' : 'timer_off',
            'slug' : 'catalogs.products.ml.relist',
            'id' : 'update-status-ml-product',
            'relist_forever_required' : this.RELIST_FOREVER_ON,
        }
    ]

    constructor(private s_permission:NgxPermissionsService){}

    menu(){
        // let menu = [];
    }

    getMenuItemAll() {
        return this.menuItems;
    }

}
