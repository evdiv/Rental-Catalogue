import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col} from 'react-bootstrap'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'
import { getAllBrands } from '../../actions/brandActions'


const DepartmentsView = () => {

    const { loading, error, brands } = useSelector(state => state.allBrands)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBrands())
    }, [])

    return (
        <Row className="justify-content-md-center">
            <Col md={12}>
                <h3>Brands</h3>
                {loading ? <Loader /> : error && <AlertMsg msg={error} variant="danger" />}
                {brands &&
                    <Row>
                        {brands.map(b => (
                            <Col md={3} key={b.brandsID}>
                                id: {b.brandsID} <Link to={`/admin/brands/${b.brandsID}`}>{b.brandName}</Link>
                            </Col>
                            )
                        )}

                    </Row>
                }
            </Col>
        </Row>
    )
}

export default DepartmentsView


