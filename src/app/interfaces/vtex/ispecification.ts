export interface Ispecification {
  CategoryId: number;
  DefaultValue: any;
  Description: string;
  FieldGroupId: number;
  FieldGroupName: string;
  FieldId: any;
  FieldTypeId: number;
  FieldTypeName:
    | "CheckBox"
    | "Radio"
    | "Text"
    | "Large Text"
    | "Combo"
    | "Number";
  FieldValueId: any;
  IsActive: boolean;
  IsFilter: boolean;
  IsOnProductDetails: boolean;
  IsRequired: boolean;
  IsSideMenuLinkActive: boolean;
  IsStockKeepingUnit: boolean;
  IsTopMenuLinkActive: boolean;
  IsWizard: boolean;
  Name: string;
  Position:number,
  Values:{FieldValueId:number,IsActive:boolean,Position:number,Value:string}[]

}
