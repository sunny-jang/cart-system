import { useState, useEffect } from "react";

const removeItem = (cart: number[], itemNo: number) => {
  let _cart = [...cart];
  _cart.splice(cart.indexOf(itemNo),1);

  return _cart;
}

const isOverItems = (cart: number[], limit: number) => {
  if(cart.length >=limit) {
    alert(`최대 ${limit}개의 상품을 장바구니에 담을 수 있습니다.`);
    return true;
  }
  return false;
}

export const useCartState = ()=>{
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")+''));
  
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])
  
  const modifyCart = (itemNo:number) => {
    if(!cart) {
      setCart([itemNo]);
    }
    else  {
      if(cart.includes(itemNo)) {
        setCart(removeItem(cart, itemNo));
      } else {
        if(isOverItems(cart, 3)) return;
        setCart([...cart, itemNo]);
      }
    }
  }

  return {cart, modifyCart};
}