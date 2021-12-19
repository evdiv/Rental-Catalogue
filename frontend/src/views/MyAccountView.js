import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, Table} from 'react-bootstrap'
import { AlertMsg } from '../components/AlertMsg'
import { getProvinces } from '../actions/provincesAction'
import { validateUser } from '../utils/validateUser'
import { getAccount, updateAccount } from '../actions/accountActions'
import { getUserOrders } from '../actions/userOrdersActions'
import DateConverter from '../components/DateConverter'

const MyAccountView = (props) => {

    const { provinces } = useSelector(state => state)
    const { details } = useSelector(state => state.account)
    const { loading, orders } = useSelector(state => state.userOrders)

    const [error, setError] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [firstName, setFirstName] = useState(details.firstName)
    const [lastName, setLastName] = useState(details.lastName)
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [homeAddress, setHomeAddress] = useState(details.homeAddress)
    const [homeCity, setHomeCity] = useState(details.homeCity)
    const [postalCode, setPostalCode] = useState(details.postalCode)
    const [provincesID, setProvincesId] = useState(details.provincesID)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProvinces())
        dispatch(getAccount())
        dispatch(getUserOrders())
    }, [])

    useEffect(() => {
        if (details.email === undefined) {
            props.history.push('/login')
        }
    }, [details.email])

    const UpdateAccountHandler = (e) => {
        e.preventDefault()
        try{
            const user = validateUser({ firstName, 
                lastName, 
                password, 
                confPassword, 
                homeAddress, 
                homeCity, 
                postalCode,
                provincesID
            }, 'update')
            dispatch(updateAccount(user))
            setError('')
            setConfirmation('Your Account has been updated')
        } catch(error) {
            setError(error.message)
        }
    }

   return (
       <Row className="justify-content-md-center">
            <Col md={6}>
               <h3>My Account</h3>
                {error !== ''  && <AlertMsg msg={error} variant="danger" />}
                {confirmation !== '' && <AlertMsg msg={confirmation} variant="success" />}
               <Form>
                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>Your First Name</Form.Label>
                           <Form.Control 
                                value={firstName}
                                placeholder="Your first name" 
                                onChange = {(e) => {setFirstName(e.target.value)}} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Your Last Name</Form.Label>
                           <Form.Control 
                                value={lastName}
                                placeholder="Your last name" 
                                onChange={(e) => {setLastName(e.target.value)}} />
                       </Form.Group>
                   </Row>

                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>Password</Form.Label>
                           <Form.Control 
                                value={password}
                                type="password" 
                                placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Confirm Password</Form.Label>
                           <Form.Control 
                                value={confPassword}
                                type="password" 
                                placeholder="Confirm password" 
                                onChange={(e) => setConfPassword(e.target.value)} />
                       </Form.Group>
                   </Row>

                   <Form.Group as={Col}>
                       <Form.Label>Your Home Address</Form.Label>
                       <Form.Control 
                            value={homeAddress}
                            placeholder="Your home address" 
                            onChange={(e) => setHomeAddress(e.target.value)} />
                   </Form.Group>

                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>Your Home City</Form.Label>
                           <Form.Control 
                                value={homeCity}
                                placeholder="Your home city" 
                                onChange={(e) => setHomeCity(e.target.value)} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Your Province</Form.Label>
                           <Form.Select 
                                value={provincesID}
                                onChange={(e) => setProvincesId(e.target.value)}>
                                <option value='0'>Choose your Province ...</option>
                               {provinces.map( province => {
                                   return (<option key={province.provincesID} value={province.provincesID}>
                                            {province.provinceName}</option>)
                               })} 
                           </Form.Select>
                       </Form.Group> 

                       <Form.Group as={Col}>
                           <Form.Label>Postal Code</Form.Label>
                           <Form.Control 
                                value={postalCode}
                                placeholder="Your postal code" 
                                onChange={(e) => setPostalCode(e.target.value)} />
                       </Form.Group>
                   </Row>
            
                   <Button 
                        onClick={e => UpdateAccountHandler(e)}
                        variant="primary" 
                        type="submit">
                       Update Account
                   </Button>
               </Form>
            </Col>
           <Col md={6}>
               <h3>My last 10 Orders</h3>
               {loading ? <h3>Loading ...</h3> 
                : !orders 
                ? <p> Orders not found </p> 
                : <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       {orders.map(o => (
                           <tr key={o.ordersID}>
                                <td>{o.ordersID}</td>
                                <td><DateConverter orderDate={o.orderDate} /></td>
                                <td>{o.orderTotal}</td>
                            </tr>)
                        )}
                    </tbody>
                </Table>
                }
           </Col>

       </Row>
   )
}

export default MyAccountView