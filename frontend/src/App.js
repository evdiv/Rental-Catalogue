import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from './components/Header'
import Footer from './components/Footer'
import FeaturedProductsView from './views/FeaturedProductsView';


const App = () =>{
  return (
    <>
    <Header />
    <Container>
        <main>
            <h1>Hello World</h1>
            <FeaturedProductsView />
        </main>
    </Container>
    <Footer />
    </>
  )
}

export default App
