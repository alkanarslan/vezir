import { Routes, Route, useParams } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Topbar from './components/Topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import { ChakraProvider, theme } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Topbar />
        <div className="container">
          <Sidebar></Sidebar>
          <div className="otherpage">orher page</div>
        </div>
        <Routes>
          <Route path="/"></Route>
          <Route path="invoices/:invoiceId" element={<Invoice />} />
          <Route path="expenses" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.invoiceId}</h1>;
}

export default App;
