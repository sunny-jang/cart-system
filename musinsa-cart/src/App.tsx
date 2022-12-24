import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './routes/products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header></header>
        <Routes>
          <Route path='/' element={<div>aaa</div>}></Route>
          <Route path='/cart' element={<div>cart</div>}></Route>
          <Route path='/products' element={<Products />}></Route>
        </Routes>
        <footer></footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
