import React from 'react'
import { Row, Col} from 'react-bootstrap'

const ConfirmationView = () => {

   return (
       <Row className="justify-content-md-center">
            <Col md={8}>
               <h3>Your order has been created</h3>
            </Col>
       </Row>
   )
}

export default ConfirmationView