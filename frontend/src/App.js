import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import BrandProductsView from './views/BrandProductsView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterAccountView from './views/RegisterAccountView'
import MyAccountView from './views/MyAccountView'
import CheckoutView from './views/CheckoutView'
import OrderView from './views/OrderView'
import OrderReceiptView from './views/OrderReceiptView'
import DepartmentsView from './views/DepartmentsView'

const App = () =>{
  return (
    <BrowserRouter>
        <Header />
        <Container>
            <main>
                <Route path="/" component={HomeView} exact />
                <Route path="/cart" component={CartView} />
				        <Route path="/departments" component={DepartmentsView} />
                <Route path="/brands/:id" component={BrandProductsView}/>
                <Route path="/products/:id" component={ProductView} />
                <Route path="/login" component={LoginView} />
                <Route path="/register" component={RegisterAccountView} />
                <Route path="/account" component={MyAccountView} />
                <Route path="/checkout" component={CheckoutView} />
                <Route path="/order" component={OrderView} />
                <Route path="/receipt/:id" component={OrderReceiptView} />
            </main>
        </Container>
        <Footer />
    </BrowserRouter>
  )
}

export default App
