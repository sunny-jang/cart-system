import React, { useEffect, useState } from 'react';
import { productItems } from '../../data/data.js';
import styles from './Product.module.scss';


export interface IAppProps {
  product: Product
}

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

export default function Product ({product}: IAppProps) {
  const [cart, setCart] = useCartState();

  return (
        <div className={styles.product}>
          <div className={styles.productThumbnail}><img src={product.detail_image_url} /></div>
          <div className={styles.productInfo}>
            <div className={styles.productName}>{product.item_name}</div>
            <div className={styles.productPrice}>{product.price}원</div>

            <button onClick={()=>{setCart(product.item_no)}}>{cart?.includes(product.item_no) ? '빼기' : '담기'}</button>
          </div>
      </div>
  );
}
