import React, { useEffect, useState } from 'react';
import Product from '../product/Products';
import styles from './CartItem.module.scss';

export interface IAppProps {
  item: CartItem,
  isChecked: boolean,
  changeSelectedItems :(item: CartItem)=>void,
  changeAmount :(item: CartItem, type:string)=>void,
}

export default function CartItem ({item, isChecked, changeSelectedItems, changeAmount}: IAppProps) {
 
  return (
    <div className={styles.cartItem}>
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
}