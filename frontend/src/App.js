import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView';
import BrandProductsView from './views/BrandProductsView';
import ProductView from './views/ProductView';
import CartView from './views/CartView';
import LoginView from './views/LoginView';


const App = () =>{
  return (
    <BrowserRouter>
        <Header />
        <Container>
            <main>
                <Route path="/" component={HomeView} exact />
                <Route path="/cart" component={CartView} />
                <Route path="/brands/:id" component={BrandProductsView}/>
                <Route path="/products/:id" component={ProductView} />
                <Route path="/login" component={LoginView} />
            </main>
        </Container>
        <Footer />
    </BrowserRouter>
  )
}

export default App
