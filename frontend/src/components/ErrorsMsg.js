import React from 'react'
import { Alert } from 'react-bootstrap'

export const ErrorsMsg = ({ error }) => {
    if(error instanceof Array ){
        error = error.join('<br/>')
    }
    return (
        <Alert variant="danger">
            {error}
        </Alert>
    )
}