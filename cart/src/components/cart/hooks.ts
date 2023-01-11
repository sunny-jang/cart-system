import { useEffect, useState } from "react";

const applyRateCoupon = (availableSum: number, discountRate: number) =>{
  let sum = 0;
  let totalDiscount = (availableSum * ((discountRate/100)));
  sum = (availableSum * (1-(discountRate/100)));

  return [sum, totalDiscount];
}

const applyAmountCoupon = (availableSum: number, discountAmount:number) => {
  let sum = 0;
  let totalDiscount = discountAmount;

  if(availableSum === 0) {
    totalDiscount = 0;
  }else {
    if(availableSum < discountAmount) {
      totalDiscount = availableSum;
    }
    sum = availableSum - totalDiscount
  };

  return [sum, totalDiscount];
}

const groupAvailablePrice = (selectedItems:CartItem[]) =>{
  let availableSum = 0, notAvailableSum = 0;

  selectedItems.map((item: CartItem)=>{
    if(item.availableCoupon!==false) {
      availableSum += (item.price * item.amount);
    }else {
      notAvailableSum += (item.price * item.amount);
    }
  });

  return {availableSum, notAvailableSum};
}

const applyCoupon = (availableSum: number,coupon: Coupon)=>{
  let discounted = 0, totalDiscount = 0;
  const discountRate = coupon?.discountRate;
  const discountAmount = coupon?.discountAmount;

  if(discountRate) {
    [discounted, totalDiscount] = applyRateCoupon(availableSum, discountRate);
  }else if(discountAmount) {
    [discounted, totalDiscount] = applyAmountCoupon(availableSum, discountAmount);
  }

  return {discounted, totalDiscount}
}

export const usePrice = (selectedItems: CartItem[], selectedCoupon?: Coupon ) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  let sum = 0;

  useEffect(()=>{
    let { availableSum, notAvailableSum } = groupAvailablePrice(selectedItems);  

    if(selectedCoupon) { 
      let {discounted, totalDiscount} = applyCoupon(availableSum, selectedCoupon);
      sum = discounted + notAvailableSum;
      setTotalDiscount(totalDiscount);
    } else {
      sum = availableSum + notAvailableSum;
    }

    setTotalPrice(sum);
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

