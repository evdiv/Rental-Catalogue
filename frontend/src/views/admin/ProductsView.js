import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Table } from 'react-bootstrap'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'
import { getAllProducts } from '../../actions/productActions'


const ProductsView = () => {

    const { loading, error, products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h3>Products</h3>
                {loading ? <Loader /> : error && <AlertMsg msg={error} variant="danger" />}
                {products &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Featured</th>
                                <th>Rental Rate</th>
                            </tr>

                        </thead>
                        <tbody>
                        {products.map(p => (
                            <tr key={p.productsID}>
                                <td><Link to={`/admin/products/${p.productsID}`}>{p.productsID}</Link></td>
                                <td>{p.productName}</td>
                                <td>{p.brandName}</td>
                                <td>{p.productModel}</td>
                                <td>{p.featured > 0 && <i style={{ color: 'green' }} class="fa fa-check-circle" aria-hidden="true"></i>}</td>
                                <td>{p.rentalRate}</td>
                            </tr>
                            )
                        )}
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    )
}

export default ProductsView
