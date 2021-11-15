import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { loginAccount } from '../actions/accountActions'

const LoginView = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { details } = useSelector(state => state.account)


    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginAccount(email, password))
    }

    useEffect(() => {
        if (details.email !== undefined) {
            props.history.push('/account')
        }
    }, [details.email, props.history])

   return (
       <Row className="justify-content-md-center">
            <Col md={4}>
               <h3>Login</h3>
               <Form>
                   <Form.Group className="mb-3" controlId="formBasicEmail">
                       <Form.Label>Email address</Form.Label>
                       <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={e => setEmail(e.target.value)}/>

                       <Form.Text className="text-muted">
                           We'll never share your email with anyone else.
                       </Form.Text>
                   </Form.Group>

                   <Form.Group className="mb-3" controlId="formBasicPassword">
                       <Form.Label>Password</Form.Label>
                       <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)} />

                   </Form.Group>
                   <Button 
                       onClick={e => loginHandler(e)}
                        variant="primary" 
                        type="submit">
                       Submit
                   </Button>
               </Form>
               
                <LinkContainer to="/register">
                   <a href="/register"><small>Don't have an account? Register now</small></a>
                </LinkContainer>
            </Col>
       </Row>
   )
}

export default LoginView

