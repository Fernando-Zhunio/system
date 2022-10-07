export interface Preferences {
    general_notification_sound: 'on' | 'off';
    general_notification_webpush: 'on' | 'off';
    general_notification_email: 'on' | 'off';
    general_notification_whatsapp: 'on' | 'off';
    dashboard_dates: PreferenceDashboard | null;
    'user.order_system.work_space'?: string | null;
    app_warehouses_export?: string | null;

}

export interface PreferenceDashboard {
    dates: {from: string, to: string},
    dates_compare: {from: string, to: string}
}