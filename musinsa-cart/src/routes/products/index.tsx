import React, { useEffect, useState } from 'react';
import Product from '../../components/product/Products';
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

const useCartState = ()=>{
  let [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")+''));
  
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])
  
  const modifyCart = (itemNo:number) => {
    if(!cart) {
      setCart([itemNo]);
    }
    else  {
      if(cart.includes(itemNo)) {
        let _cart = [...cart];
        _cart.splice(cart.indexOf(itemNo),1);
        setCart(_cart)
      } else {
        if(cart.length >=3) {
          alert("최대 3개의 상품을 장바구니에 담을 수 있습니다.");
          return;
        }
        setCart([...cart, itemNo]);
      }
    }
  }

  return [cart, modifyCart];
}

export default function Products ({}: IAppProps) {
  const [divNum, setDivNum] = useState(5);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Product[][]>([]);

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
            return <Product product={product} key={index} />
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
