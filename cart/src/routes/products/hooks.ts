import { useState, useEffect } from "react";

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

  return {cart, modifyCart};
}