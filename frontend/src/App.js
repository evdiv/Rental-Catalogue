import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header'
import Footer from './components/Footer'
import ProductView from './views/ProductView';
import FeaturedProductsView from './views/FeaturedProductsView';


const App = () =>{
  return (
    <BrowserRouter>
        <Header />
        <Container>
            <main>
                <Route path="/" component={FeaturedProductsView} exact />
                <Route path="/product/:id" component={ProductView} />
            </main>
        </Container>
        <Footer />
    </BrowserRouter>
  )
}

export default App
