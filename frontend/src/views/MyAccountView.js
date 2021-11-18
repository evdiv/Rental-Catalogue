import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { ErrorsMsg } from '../components/ErrorsMsg'
import { getProvinces } from '../actions/provincesAction'
import { validateUser } from '../utils/validateUser'
import { getAccount, updateAccount } from '../actions/accountActions'

const MyAccountView = () => {

    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [homeCity, setHomeCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [provincesId, setProvincesId] = useState(0)

    const { provinces } = useSelector(state => state)
    const { details } = useSelector(state => state.account)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProvinces())
        dispatch(getAccount())

        setFirstName(details.firstName)
        setLastName(details.lastName)
        setHomeAddress(details.homeAddress)
        setHomeCity(details.homeCity)
        setPostalCode(details.postalCode)
        setProvincesId(details.provincesId)

    }, [dispatch])

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
                provincesId
            })
            dispatch(updateAccount(user))
        } catch(error) {
            setError(error.message)
        }
    }

   return (
       <Row className="justify-content-md-center">
            <Col md={8}>
               <h3>My Account</h3>
                {error !== ''  && <ErrorsMsg error={error} />}
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
                                type="password" 
                                placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Confirm Password</Form.Label>
                           <Form.Control 
                                type="password" 
                                placeholder="Confirm password" 
                                onChange={(e) => setConfPassword(e.target.value)} />
                       </Form.Group>
                   </Row>

                   <Form.Group className="mb-3">
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
                                defaultValue="Choose..."
                                onChange={(e) => setProvincesId(e.target.value)}>
                               {provinces.map( province => {
                                   return (<option 
                                                key={province.ProvincesId}
                                                value={province.ProvincesId}
                                                selected={province.ProvincesId === provincesId}>
                                            {province.ProvinceName}</option>)
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
       </Row>
   )
}

export default MyAccountView