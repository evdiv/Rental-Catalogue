import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { loginAccount } from '../actions/accountActions'

const LoginView = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const loginHandler = () => {
        dispatch(loginAccount(email, password))
    }

   return (
       <Row>
           <h3>Login</h3>
            <Col md={8}>
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
                       onClick={e => {e.preventDefault(); loginHandler();}}
                        variant="primary" 
                        type="submit">
                       Submit
                   </Button>
               </Form>
            </Col>
       </Row>
   )
}

export default LoginView

