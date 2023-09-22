export class NgxSearchBarPageEvent {
  page = 0
  pageSize = 10
  length = 0
  optionsPageSize: number[] = []

  pageName: string
  pageSizeName: string
  lengthName: string

  constructor(
    nameParams?: { pageName?: string; pageSizeName?: string; lengthName?: string },
    options?: { optionsPageSize?: number[] }
  ) {
    this.pageName = nameParams?.pageName || 'page';
    this.pageSizeName = nameParams?.pageSizeName || 'pageSize';
    this.lengthName = nameParams?.lengthName || 'length';
    this.optionsPageSize = options?.optionsPageSize || [10, 15, 25, 50]
  }
}
