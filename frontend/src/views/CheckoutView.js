import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { AlertMsg } from '../components/AlertMsg'
import { getProvinces } from '../actions/provincesAction'
import { validateUser } from '../utils/validateUser'
import { getAccount, updateAccount } from '../actions/accountActions'

const CheckoutView = (props) => {

    const { provinces } = useSelector(state => state)
    const { details } = useSelector(state => state.account)

    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState(details.firstName)
    const [lastName, setLastName] = useState(details.lastName)
    const [homeAddress, setHomeAddress] = useState(details.homeAddress)
    const [homeCity, setHomeCity] = useState(details.homeCity)
    const [postalCode, setPostalCode] = useState(details.postalCode)
    const [provincesID, setProvincesId] = useState(details.provincesID)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProvinces())
        dispatch(getAccount())
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
                homeAddress, 
                homeCity, 
                postalCode,
                provincesID
            }, 'update')
            dispatch(updateAccount(user))
            setError('')
            props.history.push('/order')
        } catch(error) {
            setError(error.message)
        }
    }

   return (
       <Row className="justify-content-md-center">
            <Col md={8}>
               <h3>Confirm your Shipping Address</h3>
                {error !== ''  && <AlertMsg msg={error} variant="danger" />}
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
                           <Form.Label>Postal Code</Form.Label>
                           <Form.Control
                               value={postalCode}
                               placeholder="Your postal code"
                               onChange={(e) => setPostalCode(e.target.value)} />
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
                    </Row>

                   <Row className="justify-content-md-center" style={{marginTop: '50px'}}>
                       <Col md="auto">
                            <Button 
                                    onClick={e => UpdateAccountHandler(e)}
                                    variant="success" 
                                    size="lg"
                                    type="submit">
                                View Order Summary
                            </Button>
                       </Col>
                    </Row>
               </Form>
            </Col>
       </Row>
   )
}

export default CheckoutView