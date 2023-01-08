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
      <div className={styles.calculatorHeader}>
        <div className={styles.header}>총 주문금액</div>
        <div className={styles.header}>총 할인금액</div>
        <div className={styles.header}>총 결제금액</div>
      </div>
      <div className={styles.calculatorPrice}>
        <div className={styles.priceBeforeDC}>
          <span className={styles.price}>{Math.floor(priceBeforeDC)}</span>원</div>
        <div className={styles.discount}>
        <span className={styles.price}>{Math.floor(totalDiscount)}</span>원</div>
        <div className={styles.totalPrice}><span className={styles.price}>{Math.floor(totalPrice)}</span>원</div>
      </div>
      <div className={styles.couponSelect}>
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
        
        
      </div>
  )
}