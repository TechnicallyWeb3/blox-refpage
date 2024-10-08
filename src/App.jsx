import Home from './pages/Home/Home'
import { useState } from 'react';
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
// import { EthersExtension } from "@dynamic-labs/ethers-v5";
import Banner from "./components/banner/Banner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
        // walletConnectorExtensions: [EthersExtension],
                  images: [
            {
              url: "https://blox-ui.vercel.app/assets/BLOXbanner.jpg",
            },
          ],
      }}
    >
      <Banner />
      <Home/>
    </ DynamicContextProvider>
  )
}

export default App;
