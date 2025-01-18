import React, { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom';
// Link,
import './App.css'

// useMatch to grab id from path, when it exists
// useNavigate redirects (if redirected after basket creation)

function App() {

  const match = useMatch('/web/:id');
  const id = match && match.params.id;
    // if we have an id match in param
      // requerst all basket infor for the associated basket id
    

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/web/:id' element={<BasketPage basketId={id} />} />
      </Routes>
    </>
  );
}

export default App
