import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { loginAdmin } from '../../actions/admin/adminActions'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'

const LoginView = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { details, loading, error } = useSelector(state => state.admin)

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginAdmin(email, password))
    }

    useEffect(() => {
        if (details.email !== undefined) {
            props.history.push('/admin/details')
        }
    }, [details.email, props.history])

   return (
       <Row className="justify-content-md-center">
            <Col md={4}>
               {loading ? <Loader /> : error && <AlertMsg msg={error} variant="danger" />}
               <h3>Admin Login</h3>
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
            </Col>
       </Row>
   )
}

export default LoginView

