import React, { useState, useEffect } from 'react';
import Home from './pages/Home/Home';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
   
        <Home />
    </>
  );
}

export default App;
