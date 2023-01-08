declare module 'cart-types';

interface Product {
    item_no: number;
    item_name: string;
    detail_image_url: string;
    price: number;
    score: number;
    availableCoupon?: boolean | undefined;
  }

interface CartItem extends Product {
  amount: number;
}

interface Coupon {
  type: string;
  title: string;
  discountRate?: number;
  discountAmount?: number;
}