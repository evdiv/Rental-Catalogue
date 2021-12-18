export const validateUser = (user, action) => {
    action = action || 'register'

    //First Name
    if (!user.firstName || user.firstName === '') {
        throw new Error("First Name cannot be empty")
    }

    if (typeof user.firstName !== "undefined") {
        if (!user.firstName.match(/^[a-zA-Z]+$/)) {
            throw new Error("First Name can contain only letters")
        }
    }

    //Last Name
    if (!user.lastName || user.lastName === '') {
        throw new Error("Last Name cannot be empty")
    }

    if (typeof user.lastName !== "undefined") {
        if (!user.lastName.match(/^[a-zA-Z]+$/)) {
            throw new Error("Last Name can contain only letters")
        }
    }

    //Password
    if (action === 'register' && (!user.password || user.password === '')) {
        throw new Error("Password cannot be empty")
    }

    if (user.password !== '' && typeof user.password !== "undefined") {
        if (user.password !== user.confPassword) {
            throw new Error("Password and Confirmation Password don't match")
        }
    }

    //Email
    if (action === 'register' && (!user.email || user.email === '')) {
        throw new Error("Email cannot be empty")
    }

    if (typeof user.email !== "undefined") {
        const lastAtPos = user.email.lastIndexOf("@");
        const lastDotPos = user.email.lastIndexOf(".");

        if (
            !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                user.email.indexOf("@@") === -1 &&
                lastDotPos > 2 &&
                user.email.length - lastDotPos > 2
            )
        ) {
            throw new Error("Email is not valid")
        }
    }

    //Home Address
    if (!user.homeAddress || user.homeAddress === '') {
        throw new Error("Home Address cannot be empty")
    }

    //Home City
    if (!user.homeCity || user.homeCity === '') {
        throw new Error("Home City cannot be empty")
    }

    //Postal Code
    if (!user.postalCode || user.postalCode === '') {
        throw new Error("Postal Code cannot be empty")
    }

    //Province ID
    if (!user.provincesID || user.provincesID === 0) {
        throw new Error("Province has to be selected")
    }
    return user
}