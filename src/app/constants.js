export const ITEM_PER_PAGE = 10;
export function discountPrice(item){
    return Math.ceil(item.price*(1-item.discountPercentage/100),2);
}