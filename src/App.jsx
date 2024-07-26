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
        environmentId: "1b3f905d-1beb-4aa4-8dfa-dd815370e883",
        // walletConnectorExtensions: [EthersExtension],
      }}
    >
      <Home/>
    </ DynamicContextProvider>
  )
}

export default App;