import React from 'react'
import { Alert } from 'react-bootstrap'

export const AlertMsg = ({ msg, variant }) => {
    if(msg instanceof Array ){
        msg = msg.join('<br/>')
    }
    return (
        <Alert variant={variant}>
            {msg}
        </Alert>
    )
}