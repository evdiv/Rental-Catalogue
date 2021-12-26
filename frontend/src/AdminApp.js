import React from 'react'
import { Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Header from './components/admin/Header'
import Footer from './components/admin/Footer'
import OrdersView from './views/admin/OrdersView'
import OrderView from './views/admin/OrderView'
import ProductsView from './views/admin/ProductsView'
import ProductView from './views/admin/ProductView'
import DepartmentsView from './views/admin/DepartmentsView'
import DepartmentView from './views/admin/DepartmentView'
import BrandsView from './views/admin/BrandsView'
import BrandView from './views/admin/BrandView'
import UsersView from './views/admin/UsersView'
import UserView from './views/admin/UserView'
import LoginView from './views/admin/LoginView'
import AdminView from './views/admin/AdminView'

const AdminApp = () =>{
  	return (
		<>
            <Header />
                <Container>
                    <main>
                        <Route path="/admin" component={LoginView} exact />
                        <Route path="/admin/details" component={AdminView} />
                        <Route path="/admin/products" component={ProductsView} exact/>
                        <Route path="/admin/products/:id" component={ProductView} />
                        <Route path="/admin/departments" component={DepartmentsView} exact/>
                        <Route path="/admin/departments/:id" component={DepartmentView} />
                        <Route path="/admin/brands" component={BrandsView} exact />
                        <Route path="/admin/brands/:id" component={BrandView} />
                        <Route path="/admin/orders" component={OrdersView} exact/>
                        <Route path="/admin/orders/:id" component={OrderView} />
                        <Route path="/admin/users" component={UsersView} exact />
                        <Route path="/admin/users/:id" component={UserView} />
                    </main>
                </Container>
            <Footer />
		</>
  )
}

export default AdminApp
