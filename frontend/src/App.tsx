import Home from './components/Home';
import BasketPage from './components/BasketPage';
import { Routes, Route, useMatch, Navigate } from 'react-router-dom';

function App() {
  const match = useMatch('/web/:id');
  const id = match && match.params.id;

  return (
    <>
      <Routes>
        {/* do we need a path for "/" to redirect to home page "/web/" */}
        <Route path="/" element={<Navigate to="/web/" replace/>} />
        <Route path="/web/" element={<Home />} />
        <Route path='/web/:id' element={<BasketPage id={id} />} />
      </Routes>
    </>
  );
}

export default App
