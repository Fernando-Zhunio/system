import { Chart } from 'chart.js';

export interface IversusChart {
    chart: Chart;
    isLoading: boolean;
    isVersus: boolean;
    data: any;
    dateRange: {first_date: any[], last_date: any[]};
    create_chart(id, type, datasets?, option?): void;
    execute_versus(): void;
}
