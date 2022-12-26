import React, { useEffect, useState } from 'react';
import { productItems, coupons } from '../../data/data.js';
import styles from './index.module.scss';
import _ from 'lodash';
import Product from '../../components/product/Products';
import Products from '../products/index.js';

export interface IAppProps {}

export default function Cart ({}: IAppProps) {
  const [selectedItems, setSelectedItems] = useState<Array<CartItem>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);

  useEffect(()=>{
    let addedItems = JSON.parse(localStorage.getItem("cart")+'');
    let items: CartItem[] = addedItems.map((item: number)=>{
      return _.find(productItems, { item_no: item });
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
        else if(operater === 'minus'){
          if(_item.amount >= 2) _item.amount -= 1
        }

        _.remove(selectedItems, {item_no: item.item_no});
        setSelectedItems([...selectedItems, _item])
      }
    }
  
  return (
    <div className={styles.cart}>
      {
        cartItems.map((item, index)=>{
          return (
            <div className={styles.cartItem}>
              <input 
                type="checkbox"
                checked={_.find(selectedItems, {item_no: item.item_no})? true: false}
                onChange={()=>changeSelectedItems(item)} />
              <Product product={item} />
              <button onClick={()=>changeAmount(item, 'plus')}>+</button>
              <span>{item.amount ? item.amount : 1}</span>
              <button onClick={()=>changeAmount(item, 'minus')}>-</button>
            </div>
            )
        })
      }
    </div>
  );
}
