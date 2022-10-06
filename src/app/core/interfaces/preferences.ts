export interface Preferences {
    general_notification_sound: 'on' | 'off';
    general_notification_webpush: 'on' | 'off';
    general_notification_email: 'on' | 'off';
    general_notification_whatsapp: 'on' | 'off';
    dashboard_dates: boolean | {
            dates: {from: string, to: string},
            dates_compare: {from: string, to: string}
        } | null;
}
