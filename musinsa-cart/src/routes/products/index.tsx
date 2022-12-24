import React, { useEffect } from 'react';
import { productItems } from '../../data/data.js';

export interface IAppProps {}

export default function App ({}: IAppProps) {
  return (
    <div>
      {
        productItems.map((product, index)=>{
            return <div key={index}>
                <div>{product.price}</div>
                <div><img src={product.detail_image_url} /></div>
                <div>{product.item_name}</div>
            </div>
        })
      }
    </div>
  );
}
