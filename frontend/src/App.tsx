// import React, { useState } from 'react';
import Home from './components/Home';
import BasketPage from './components/BasketPage';
import { Routes, Route, useMatch } from 'react-router-dom';
// Link,

// useNavigate redirects (if redirected after basket creation)

function App() {
  const match = useMatch('/web/:id');
  const id = match && match.params.id;

  return (
    <>
      <Routes>
        {/* do we need a path for "/" to redirect to home page "/web/" */}
        <Route path="/web/" element={<Home />} />
        <Route path='/web/:id' element={<BasketPage id={id} />} />
      </Routes>
    </>
  );
}

export default App
