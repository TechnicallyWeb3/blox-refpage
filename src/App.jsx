import Home from './pages/Home/Home'
import { useState } from 'react';
import {
  DynamicContextProvider,
} from "@/dynamic-labs/sdk-react-core";
// import { EthersExtension } from "@dynamic-labs/ethers-v5";
import Banner from "./components/banner/Banner";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DynamicContextProvider
      settings={{
        environmentId: "1b3f905d-1beb-4aa4-8dfa-dd815370e883",
        // walletConnectorExtensions: [EthersExtension],
                  images: [
            {
              url: "https://blox-ui.vercel.app/assets/BLOXbanner.jpg",
            },
          ],
      }}
    >
      <Home/>
      <Banner />
    </ DynamicContextProvider>
  )
}

export default App;
