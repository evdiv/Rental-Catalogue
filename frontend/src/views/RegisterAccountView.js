import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AlertMsg } from '../components/AlertMsg'
import { getProvinces } from '../actions/provincesAction'
import { registerAccount } from '../actions/accountActions'
import { validateUser } from '../utils/validateUser'

const RegisterAccountView = (props) => {

    const [error, setError] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
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
        setError('')
    }, [firstName, lastName, homeAddress, homeCity, postalCode, provincesId])

    useEffect(() => {
        if (details.email !== undefined){
            props.history.push('/account')
        }
        dispatch(getProvinces())
    }, [dispatch, details.email, props.history])

    const RegisterHandler = (e) => {
        e.preventDefault()
        try{
            const user = validateUser({ firstName, 
                lastName, 
                email, 
                password, 
                confPassword, 
                homeAddress, 
                homeCity, 
                postalCode,
                provincesId
            })
            dispatch(registerAccount(user))
        } catch(error) {
            setError(error.message)
        }
    }

   return (
       <Row className="justify-content-md-center">
            <Col md={8}>
               <h3>Register Account</h3>
                {error !== ''  && <AlertMsg error={error} variant="danger" />}
               <Form>
                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>Your First Name</Form.Label>
                           <Form.Control 
                                placeholder="Your first name" 
                                onChange = {(e) => {setFirstName(e.target.value)}} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Your Last Name</Form.Label>
                           <Form.Control 
                                placeholder="Your last name" 
                                onChange={(e) => {setLastName(e.target.value)}} />
                       </Form.Group>
                   </Row>

                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>Your Email</Form.Label>
                           <Form.Control 
                                type="email" 
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)} />
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
                            placeholder="Your home address" 
                            onChange={(e) => setHomeAddress(e.target.value)} />
                   </Form.Group>

                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>Your Home City</Form.Label>
                           <Form.Control 
                                placeholder="Your home city" 
                                onChange={(e) => setHomeCity(e.target.value)} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Your Province</Form.Label>
                           <Form.Select 
                                defaultValue="Choose..."
                                onChange={(e) => setProvincesId(e.target.value)}>
                               {provinces.map( province => {
                                   return (<option key={province.ProvincesId}
                                                value={province.ProvincesId}>{province.ProvinceName}</option>)
                               })}
                           </Form.Select>
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Postal Code</Form.Label>
                           <Form.Control 
                                placeholder="Your postal code" 
                                onChange={(e) => setPostalCode(e.target.value)} />
                       </Form.Group>
                   </Row>
            
                   <Button 
                        onClick={e => RegisterHandler(e)}
                        variant="primary" 
                        type="submit">
                       Register Account
                   </Button>
               </Form>

               <LinkContainer to="/login">
                   <a href="/login"><small>Already have an account? LogIn now</small></a>
               </LinkContainer>

            </Col>
       </Row>
   )
}

export default RegisterAccountView