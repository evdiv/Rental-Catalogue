import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from './components/Header'
import Footer from './components/Footer'


const App = () =>{
  return (
    <>
    <Header />
    <Container>
        <main>
            <h1>Hello World</h1>
        </main>
    </Container>
    <Footer />
    </>
  )
}

export default App
