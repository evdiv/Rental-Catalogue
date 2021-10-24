import React from 'react'

const RentalTerm = ({term}) => {
    const months = parseInt(term / 30, 10)
    const weeks = parseInt(months > 0 ? (term - (months * 30)) / 7 : term / 7)
    const days = term - ((months * 30) + (weeks * 7))

    return (
        <>
            {months > 0 && `${months} months `}
            {weeks > 0 && `${weeks} weeks `}
            {days > 0 && `${days} days`}
        </>
    )
}

export default RentalTerm