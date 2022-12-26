import React, { useEffect, useState } from 'react';
import { productItems, coupons } from '../../data/data.js';
import styles from './index.module.scss';
import _ from 'lodash';
import Product from '../../components/product/Products';
import Products from '../products/index.js';

export interface IAppProps {}

export default function Cart ({}: IAppProps) {
  const [selectedItems , setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState<Array<Product>>([]);
  useEffect(()=>{
    let addedItems = JSON.parse(localStorage.getItem("cart")+'');
    let items: Product[] = addedItems.map((item: number)=>{
      return _.find(productItems, { item_no: item });
    });

    setCartItems(items);
  },[])
  
  return (
    <div className={styles.cart}>
      {
        cartItems.map((item, index)=>{
          return  <Product product={item} />
        })
      }
    </div>
  );
}
