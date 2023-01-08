import React, { useEffect, useState } from 'react';
import Product from '../../components/product/Products';
import { productItems } from '../../data/data.js';
import styles from './index.module.scss';
import { useCartState } from './hooks';
import { Link } from 'react-router-dom';


export interface IAppProps {}

interface Product {
	item_no: number,
  item_name: string,
  detail_image_url: string,
  price: number,
  score: number,
}

export default function Products ({}: IAppProps) {
  const divNum = 5;
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
      <h1>상품 목록</h1>
        {
          list?.length <=0 
          ? <div className={styles.noContent}>상품 목록이 준비 중입니다.</div>
            : list?.[page-1]?.map((product, index)=>{
              return <Product product={product} cart={cart} setCart={modifyCart} key={index} />
          })
        }
        <div className={styles.pagination}>
          {
            list?.map((item, index)=>{
              return <button className={styles.paginationItem} key={index} onClick={()=>setPage(index+1)}>{index+1}</button>
            }) 
          }
        </div>
        <div  className={styles.linkCart}>
          <Link to={`/cart`}>장바구니 바로가기</Link>
        </div>
      </div>
  );
}
