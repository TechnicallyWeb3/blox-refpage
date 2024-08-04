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
        environmentId: "f33dce35-fedc-48b4-a0b9-ac69b89345af",
        // walletConnectorExtensions: [EthersExtension],
      }}
    >
      <Home/>
    </ DynamicContextProvider>
  )
}

export default App;