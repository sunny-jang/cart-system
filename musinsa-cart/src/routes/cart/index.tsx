import React, { useEffect, useState } from 'react';
import Product from '../../components/product/Products';
import { productItems, coupons } from '../../data/data.js';
import styles from './products.module.scss';

export interface IAppProps {}

export interface Coupon {
    type: string,
    title: string,
    discountRate?: number,
    discountAmount?: number
}

export default function Cart ({}: IAppProps) {
  
  return (
    <div className={styles.cart}>
      
    </div>
  );
}
