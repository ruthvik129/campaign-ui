import './App.css';
import CampaignContainer from './containers/CampaignDashboard'
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <CampaignContainer />
    </ChakraProvider>
  );
}

export default App;
