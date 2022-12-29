import React, { useEffect, useState } from 'react';
import { productItems, coupons } from '../../data/data.js';
import styles from './index.module.scss';
import _ from 'lodash';
import Calculator from '../../components/cart/Calculator';
import CartItem from '../../components/cart/CartItem';

export interface IAppProps {}

export default function Cart ({}: IAppProps) {
  const [selectedItems, setSelectedItems] = useState<Array<CartItem>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);

  useEffect(()=>{
    let addedItems = JSON.parse(localStorage.getItem("cart")+'');
    let items: CartItem[] = addedItems.map((item: number)=>{
      return {...(_.find(productItems, { item_no: item })), amount: 1};
    });

    setCartItems(items);
  },[]);

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
          const cartItem = {item, isChecked, changeAmount, changeSelectedItems};
          
          return (
            <CartItem
              {...cartItem}
             />
            )
        })
      }
      </div>
      <Calculator selectedItems={selectedItems} />
    </div>
  );
}
