import React, { useEffect, useState } from 'react';
import Product from '../../components/product/Products';
import { productItems } from '../../data/data.js';
import styles from './products.module.scss';
import { useCartState } from './hooks';


export interface IAppProps {}

interface Product {
	item_no: number,
  item_name: string,
  detail_image_url: string,
  price: number,
  score: number,
}

export default function Products ({}: IAppProps) {
  const [divNum, setDivNum] = useState(5);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Product[][]>([]);
  const {cart, modifyCart} = useCartState();

  const chunk = (list:Array<Product>, size:number)=> {
    let sortedList = list.sort((a,b) => a.score-b.score);
    let _list:Array<Array<Product>> = [];
    for (let i = 0; i < list.length; i += size) {
      _list.push(sortedList.slice(i, i + size));
    }
    return _list;
  }
  
  useEffect(()=>{
    setList(chunk(productItems, divNum));
  },[]);

  return (
    <div className={styles.products}>
      {
        list?.[page-1]?.map((product, index)=>{
            return <Product product={product} cart={cart} setCart={modifyCart} key={index} />
        })
      }
      {
        list.map((item, index)=>{
          return <button key={index} onClick={()=>setPage(index+1)}>{index+1}</button>
        }) 
      }
    </div>
  );
}
