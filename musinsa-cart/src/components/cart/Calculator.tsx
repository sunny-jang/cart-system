import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { coupons } from '../../data/data';
import styles from './Calculator.module.scss';
import { usePrice, usePriceBefore } from './hooks';

export interface IAppProps {
  selectedItems:CartItem[]
}

export default function Calculator ({selectedItems}: IAppProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>()
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const {totalPrice, totalDiscount} = usePrice( selectedItems, selectedCoupon);
  const priceBeforeDC = usePriceBefore(selectedItems);

  return (
    <div className={styles.calculator}>
        <div className={styles.priceBeforeDC}>상품 금액 : {priceBeforeDC}원</div>
        <div className={styles.discount}>할인된 금액 : -{totalDiscount}원</div>
        <div className={styles.totalPrice}>결제 금액 : {totalPrice}원</div>
        
        <button onClick={()=>{setIsCouponOpen(!isCouponOpen)}}>쿠폰사용</button>
        {selectedCoupon && <span> 선택된 쿠폰 : {selectedCoupon?.title}<br/></span>}

        <div 
          className={classnames(styles.couponList,{[styles.isShow]: isCouponOpen})}>
          {coupons.map((coupon,index) => {
            return <div 
              onClick={()=>{
                setSelectedCoupon(coupon);
                setIsCouponOpen(!isCouponOpen)
              }}
              className={styles.coupon} 
              key={index}>{coupon.title}
            </div>
          })}
        </div>
      </div>
  )
}