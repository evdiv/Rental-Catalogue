import React from 'react'

const PaymentType = ({payment}) => {
    let paymentType = ''
    switch (payment) {
        case 'cc':
            paymentType = "Visa/MasterCard/American Express"
            break;
        case 'paypal':
            paymentType = "PayPal"
            break;
        case 'etransfer':
            paymentType = "Email Money Transfer"
            break;
        default:
            break;
    }
    return <>{paymentType}</>
}

export default PaymentType