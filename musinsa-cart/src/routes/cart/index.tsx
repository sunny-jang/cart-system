import React, { useEffect, useState } from 'react';
import { productItems, coupons } from '../../data/data.js';
import styles from './index.module.scss';
import _ from 'lodash';
import Product from '../../components/product/Products';
import classnames from 'classnames';

export interface IAppProps {}

export default function Cart ({}: IAppProps) {
  const [selectedItems, setSelectedItems] = useState<Array<CartItem>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [priceBeforeDC, setPriceBeforeDC] = useState(0);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>()

  useEffect(()=>{
    let addedItems = JSON.parse(localStorage.getItem("cart")+'');
    let items: CartItem[] = addedItems.map((item: number)=>{
      return {...(_.find(productItems, { item_no: item })), amount: 1};
    });

    setCartItems(items);
  },[]);

  useEffect(()=>{
    let sum = 0;
    selectedItems.map((item)=>{
      sum += ((item.amount) * item.price)
    });

    setPriceBeforeDC(sum);
  },[selectedItems])

  useEffect(()=>{
    let availableSum = 0;
    let notAvailableSum = 0;
    let totalDC = 0;
    let sum = 0;

    if(selectedCoupon) {
      selectedItems.map(item=>{
        if(item.availableCoupon!==false) {
          availableSum += (item.price * item.amount);
        }else {
          notAvailableSum += (item.price * item.amount);
        }
      });

      if(selectedCoupon.discountRate) {
        sum += (availableSum * (1-(selectedCoupon.discountRate/100)));
        setTotalDiscount(availableSum * ((selectedCoupon.discountRate/100)));
      }else if(selectedCoupon.discountAmount) {
        if(availableSum !== 0) {
          sum += (availableSum - selectedCoupon.discountAmount);
          setTotalDiscount(selectedCoupon.discountAmount);
        };
      }

    } else {
        selectedItems.map((item)=>{
          sum += ((item.amount) * item.price)
        });
    }

    setTotalPrice(sum + notAvailableSum);
  },[selectedItems, selectedCoupon])

  const changeSelectedItems = (item:CartItem) => {
    if(_.find(selectedItems, {item_no: item.item_no})) {
      _.remove(selectedItems, (i)=>i.item_no === item.item_no);
      setSelectedItems([...selectedItems])

    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  const changeAmount = (item: CartItem, operater: string)=>{
      let _item = _.find(selectedItems, {item_no: item.item_no});
      
      if(_item) {
        if(!_item.amount) _item.amount = 1;

        if(operater === 'plus') {_item.amount += 1}
        if(operater === 'minus'){
          if(_item.amount >= 2) _item.amount -= 1
        }

        _.remove(selectedItems, {item_no: item.item_no});
        setSelectedItems([...selectedItems, _item])
      }
    }
  
  return (
    <div className={styles.cart}>
      <h2>장바구니</h2>
      <div className={styles.cartList}>
      {
        cartItems.map((item, index)=>{
          const isChecked = _.find(selectedItems, {item_no: item.item_no})? true: false;
          return (
            <div className={styles.cartItem} key={index}>
              <input 
                className={styles.checkbox}
                type="checkbox"
                checked={isChecked}
                onChange={()=>changeSelectedItems(item)} />
              <Product product={item} />
              
              <button 
                className={styles.countButton} 
                disabled={!isChecked}
                onClick={()=>changeAmount(item, 'plus')}>+
              </button>
              <span>{item.amount ? item.amount : 1}</span>
              <button 
                className={styles.countButton} 
                disabled={!isChecked}
                onClick={()=>changeAmount(item, 'minus')}>-
              </button>
            </div>
            )
        })
      }
      </div>
      <div>
        상품 금액 : {priceBeforeDC}원<br/>
        할인된 금액 : {totalDiscount}원<br/>
        결제 금액 : {totalPrice}원<br/>
        {selectedCoupon && <span>선택된 쿠폰 : {selectedCoupon?.title}<br/></span>}
        <button onClick={()=>{setIsCouponOpen(!isCouponOpen)}}>쿠폰사용</button><br/>
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
  );
}
