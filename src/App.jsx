import Home from './pages/Home/Home'
import { useState } from 'react';
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
// import { EthersExtension } from "@dynamic-labs/ethers-v5";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
        // walletConnectorExtensions: [EthersExtension],
      }}
    >
      <Home/>
    </ DynamicContextProvider>
  )
}

export default App;