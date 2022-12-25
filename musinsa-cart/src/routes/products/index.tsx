import React, { useEffect, useState } from 'react';
import { productItems } from '../../data/data.js';
import styles from './products.module.scss';


export interface IAppProps {}

interface Product {
	item_no: number,
  item_name: string,
  detail_image_url: string,
  price: number,
  score: number,
}
export default function App ({}: IAppProps) {
  const [divNum, setDivNum] = useState(5);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Product[][]>([]);

  const chunk = (list:Array<Product>, size:number)=> {
    let _list:Array<Array<Product>> = [];
    for (let i = 0; i < list.length; i += size) {
      _list.push(list.slice(i, i + size));
    }
    return _list;
  }
  
  useEffect(()=>{
    setList(chunk(productItems, divNum));
    console.log(list)
  },[]);

  return (
    <div className={styles.products}>
      {
        list?.[0]?.map((product, index)=>{
            return <div key={index} className={styles.product}>
                <div className={styles.productThumbnail}><img src={product.detail_image_url} /></div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{product.item_name}</div>
                  <div className={styles.productPrice}>{product.price}원</div>
                </div>
            </div>
        })
      }
    </div>
  );
}
