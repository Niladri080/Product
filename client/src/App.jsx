import SignupPage from "./pages/SignupPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import Dummydashboard from "./pages/Dummydashboard";
import PrivateAuth from "./components/PrivateAuth";
import LoginPage from "./pages/LoginPage";
import Mensection from "./pages/Mensection";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateAdminAuth from "./components/PrivateAdminAuth";
import { UserProvider } from "./contexts/UserContext";
import AddProduct from "./pages/AddProduct";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import ProductPage from "./pages/ProductPage";
import UserSettings from "./pages/UserSettings";
import EditProduct from "./pages/EditProduct";
import AdminProductView from "./pages/AdminProductView";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPlaced from "./pages/OrderPlaced";
import UserOrders from "./pages/UserOrders";
const App = () => {
  const [refresh,setrefresh]=useState(0);
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Dummydashboard />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateAuth>
              <UserDashboard />
            </PrivateAuth>
          }
        />
        <Route path='/user/dashboard/checkout/:id' element={
          <PrivateAuth><CheckoutPage/></PrivateAuth>
        }></Route>
        <Route path='/user/dashboard/myorders' element={
          <PrivateAuth><UserOrders/></PrivateAuth>
        }></Route>
         <Route path='/user/dashboard/checkout/placed' element={
          <PrivateAuth><OrderPlaced/></PrivateAuth>
        }></Route>
        <Route path='/user/dashboard/settings' element={<PrivateAuth><UserSettings/></PrivateAuth>}></Route>
         <Route path='/admin/dashboard' key={refresh} element={<PrivateAdminAuth><AdminDashboard refresh={refresh}/></PrivateAdminAuth>}>
        </Route>
        <Route path='/admin/dashboard/product-view/:id' element={
          <PrivateAdminAuth><AdminProductView/></PrivateAdminAuth>
        }></Route>
        <Route path='/admin/dashboard/add-product' element={<PrivateAdminAuth><AddProduct setrefresh={setrefresh} refresh={refresh}/></PrivateAdminAuth>}>
        </Route>
        <Route path='/admin/dashboard/edit-product/:id' element={<PrivateAdminAuth><EditProduct/></PrivateAdminAuth>}></Route>
        <Route path='/user/dashboard/product_view/:id' element={<PrivateAuth><ProductPage/></PrivateAuth>}></Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
};
export default App;
