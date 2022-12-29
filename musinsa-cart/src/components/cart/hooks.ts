import { useEffect, useState } from "react";

export const usePrice = (selectedItems: CartItem[], selectedCoupon?: Coupon ) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  let availableSum = 0;
  let notAvailableSum = 0;
  let sum = 0;

  useEffect(()=>{
    if(selectedCoupon) {
      selectedItems.map((item: CartItem)=>{
        if(item.availableCoupon!==false) {
          availableSum += (item.price * item.amount);
        }else {
          notAvailableSum += (item.price * item.amount);
        }
      });

      if(selectedCoupon.discountRate) {
        sum += (availableSum * (1-(selectedCoupon.discountRate/100)));
        setTotalDiscount(availableSum * ((selectedCoupon.discountRate/100)));
      }else if(selectedCoupon.discountAmount) {
        if(availableSum !== 0) {
          sum += (availableSum - selectedCoupon.discountAmount);
          setTotalDiscount(selectedCoupon.discountAmount);
        };
      }

    } else {
        selectedItems.map((item:CartItem)=>{
          sum += ((item.amount) * item.price)
        });
    }
  
  setTotalPrice(sum + notAvailableSum);
  },[selectedItems, selectedCoupon])

  return {totalPrice, totalDiscount}
};


export const usePriceBefore = (selectedItems: CartItem[])=>{
  let [sum, setSum] = useState(0);

  useEffect(()=>{
    let _sum = 0;
    selectedItems.map((item: CartItem)=>{
      _sum += ((item.amount) * item.price);
    });

    setSum(_sum)
  },[selectedItems]);

  return sum;
};

