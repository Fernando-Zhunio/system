export interface IvtexProducts {
  Id: number;
  Name: string;
  DepartmentId: number;
  CategoryId: number;
  BrandId: number;
  LinkId: string;
  RefId: string;
  IsVisible: boolean;
  Description: string;
  DescriptionShort: string;
  ReleaseDate: string;
  KeyWords: string;
  Title: string;
  IsActive: boolean;
  TaxCode: string;
  MetaTagDescription: string;
  SupplierId: number;
  ShowWithoutStock: boolean;
  AdWordsRemarketingCode: string;
  LomadeeCampaignCode: string;
  Score: number;
}

export interface IvtexSkuStore{
// ActivateIfPossible: boolean,
// CommercialConditionId: any,
// CreationDate: string,
// CubicWeight: number,
// EstimatedDateArrival: any,
// Height: any,
// Id: number,
// IsActive: boolean,
// IsKit: boolean,
// KitItensSellApart: boolean,
// Length: any,
// ManufacturerCode: any,
// MeasurementUnit: string,
// ModalType: any,
// Name: string,
// PackagedHeight: number,
// PackagedLength: number,
// PackagedWeightKg: number,
// PackagedWidth: number,
// ProductId: number,
// RefId: string,
// RewardValue: any,
// UnitMultiplier: number,
// Videos: any[],
// WeightKg: any,
// Width: any,

ActivateIfPossible: boolean,
ApprovedAdminId: any,
CommercialConditionId: number,
CubicWeight: number,
DateUpdated: string,
EditionAdminId: any,
EditionSkuId: any,
EstimatedDateArrival: any,
FlagKitItensSellApart: boolean,
Height: number,
Id: number,
InternalNote: any,
IsActive: boolean,
IsDynamicKit: any,
IsGiftCardRecharge: any,
IsInventoried: any,
IsKit: boolean,
IsPersisted: boolean,
IsRemoved: boolean,
IsTransported: any,
Length: number,
ManufacturerCode: any,
MeasurementUnit: string,
ModalId: number,
ModalType: any,
Name: string,
Position: number,
ProductId: number,
RealHeight: any,
RealLength: any,
RealWeightKg: any,
RealWidth: any,
RefId: string,
ReferenceStockKeepingUnitId: any,
RewardValue: any,
SupplierCode: any,
UnitMultiplier: number,
WeightKg: number,
Width: number,
isKitOptimized: boolean,
}

export interface IvtexResponseProduct {
  created_at: string;
  description: string;
  id: number;
  is_visible: string;
  link: string;
  link_id: string;
  name: string;
  site: vtexSite;
  skus: vtexResponseSku[];
  specifications: [];
  status: string;
  updated_at: string;
  vtex_api_id: number;
  vtex_site_id: number;
}

interface vtexSite {
  app_key: string;
  app_token: string;
  created_at: string;
  friendly_name: string;
  id: string;
  name: string;
  updated_at: string;
  url: string;
  vtex_api_id: string;
}

export interface vtexResponseSku {
  created_at: string;
  cubicweight: number;
  ean: string;
  height: number;
  id: number;
  images: any[];
  length: number;
  name: string;
  product_id: number;
  reference_code: string;
  specifications: string;
  status: string;
  updated_at: string;
  vtex_api_id: string;
  vtex_product_id: number;
  weight: number;
  width: number;
}
