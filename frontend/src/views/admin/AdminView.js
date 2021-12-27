import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button} from 'react-bootstrap'
import { AlertMsg } from '../../components/AlertMsg'
import { Loader } from '../../components/Loader'
import { getAdmin, updateAdmin } from '../../actions/admin/adminActions'

const AdminView = (props) => {

    const { details, loading, error  } = useSelector(state => state.admin)
    const [confirmation, setConfirmation] = useState('')
    const [email, setEmail] = useState(details.email)
    const [userName, setUsername] = useState(details.userName)
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdmin())
    }, [])

    useEffect(() => {
        if (details.email === undefined) {
            props.history.push('/admin/')
        }
    }, [details.email])

    const UpdateAdminHandler = (e) => {
        e.preventDefault()
        dispatch(updateAdmin({userName, password, email}))
        setConfirmation('Your Account has been updated')
    }

   return (
       <Row className="justify-content-md-center">
            <Col md={6}>
               <h3>My Details</h3>
                {loading ? <Loader /> : error ? <AlertMsg msg={error} variant="danger" /> : ''}
                {confirmation !== '' && <AlertMsg msg={confirmation} variant="success" />}
               <Form>
                   <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Form.Label>User Name</Form.Label>
                           <Form.Control 
                                value={userName}
                                placeholder="User Name"
                                onChange={(e) => { setUsername(e.target.value)}} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Email</Form.Label>
                           <Form.Control 
                                value={email}
                                placeholder="Email" 
                                onChange={(e) => { setEmail(e.target.value)}} />
                       </Form.Group>

                       <Form.Group as={Col}>
                           <Form.Label>Password</Form.Label>
                           <Form.Control 
                                value={password}
                                type="password" 
                                placeholder="Enter your password" 
                                onChange={(e) => setPassword(e.target.value)} />
                       </Form.Group>
                   </Row>

                   <Button 
                        onClick={e => UpdateAdminHandler(e)}
                        variant="primary" 
                        type="submit">
                       Update
                   </Button>
               </Form>
            </Col>
       </Row>
   )
}

export default AdminView