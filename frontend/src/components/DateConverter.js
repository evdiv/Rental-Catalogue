import React from 'react'

const DateConverter = ({ orderDate }) => {
    const date = new Date(orderDate)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const convertedDate = new Intl.DateTimeFormat('en-US', options).format(date)

    return <>{convertedDate}</>
}

export default DateConverter