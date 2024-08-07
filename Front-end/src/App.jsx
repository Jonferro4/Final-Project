import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/homepage/homepage';
import AllUsers from './components/allusers'
import Inventory from './components/inventories'
import { UserProvider } from './components/homepage/UserState';
import Header from './components/homepage/header';
import AllItems from './components/allitems';
import ItemDetail from './components/itemdetails';


function App() {
  return (
    <UserProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/user/:id" element={<Inventory />} />
        <Route path="/items" element={<AllItems />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;