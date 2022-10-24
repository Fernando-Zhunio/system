export const PROMOTION_STATUS_ACTIVE = 'active';
export const PROMOTION_STATUS_INACTIVE = 'inactive';
export const PROMOTION_STATUS_EXPIRED = 'expired';

export const PROMOTION_DURATION_UNDEFINED = 'undefined';
export const PROMOTION_DURATION_DATE_RANGE = 'date_range';


export function getStatusesPromotionArray(): Array<string>  {
    return [
         PROMOTION_STATUS_ACTIVE,
         PROMOTION_STATUS_INACTIVE,
         PROMOTION_STATUS_EXPIRED
    ]
}

export function getDurationPromotionArray(): Array<string>  {
    return [
         PROMOTION_DURATION_UNDEFINED,
         PROMOTION_DURATION_DATE_RANGE
    ]
}

