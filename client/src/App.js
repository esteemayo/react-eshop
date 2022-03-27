import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  Cart,
  Home,
  Login,
  NotFound,
  Product,
  ProductList,
  Register,
  Success,
} from 'pages/index';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ProtectedRoute from 'utils/ProtectedRoute';
import Announcement from 'components/Announcement';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <Announcement />
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route index element={<Home />} />
        <Route path='products/:category' element={<ProductList />} />
        <Route path='product/:slug' element={<Product />} />
        <Route
          path='register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path='cart' element={<Cart />} />
        <Route path='success' element={<Success />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
