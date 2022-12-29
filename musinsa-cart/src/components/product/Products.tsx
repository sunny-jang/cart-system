import React, { useEffect, useState } from 'react';
import styles from './Product.module.scss';

export interface IAppProps {
  product: Product, 
  cart?: number[],
  setCart?: (itemN0:number)=>void
}

export default function Product ({product, cart, setCart}: IAppProps) {

  return (
      <div className={styles.product}>
        <div className={styles.productThumbnail}><img src={product.detail_image_url} /></div>
        <div className={styles.productInfo}>
          <div className={styles.productName}>{product.item_name}</div>
          <div className={styles.productPrice}>{product.price}원</div>
          <div className={styles.couponAvilable}>
            {product?.availableCoupon !== false ? '쿠폰사용 가능' : '쿠폰 사용 불가능'}
          </div>
          {
            setCart &&
              <button className={styles.setCart} onClick={()=>{setCart(product.item_no)}}>{cart?.includes(product.item_no) ? '빼기' : '담기'}</button>
          }
        </div>
    </div>
  );
}
