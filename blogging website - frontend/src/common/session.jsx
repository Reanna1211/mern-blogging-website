
//stores the session

const storeInSession = (key, value) => {
    return sessionStorage.setItem(key, value);
}

// looks into the session
const lookInSession = (key) => {
    return sessionStorage.getItem(key)
}

// removes the session
const removeFromSession = (key) => {
    return sessionStorage.removeItem(key)
}

// log out user
const logOutUser = () => {
    sessionStorage.clear()
}

export { storeInSession, lookInSession,  removeFromSession, logOutUser }