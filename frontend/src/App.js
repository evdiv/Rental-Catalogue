import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView';
import BrandProductsView from './views/BrandProductsView';
import ProductView from './views/ProductView';



const App = () =>{
  return (
    <BrowserRouter>
        <Header />
        <Container>
            <main>
                <Route path="/" component={HomeView} exact />
                <Route path="/brands/:id" component={BrandProductsView}/>
                <Route path="/products/:id" component={ProductView} />
            </main>
        </Container>
        <Footer />
    </BrowserRouter>
  )
}

export default App
