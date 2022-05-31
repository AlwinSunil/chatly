import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

function Signup() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const signupwithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                console.log(result.user)
                console.log("Token :" + token)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(error)
                console.log(errorCode + " : " + errorMessage)
                console.log("Credential : " + credential)
                console.log(error.email)
            })
    }

    useEffect(() => {
        document.title = "Sign up - Chatly"
    }, [])

    return (
        <div className="auth">
            <div className="auth__card">
                <div className="auth__header">
                    <h3>Sign up</h3>
                    <button onClick={signupwithGoogle}>
                        <img src="/assets/icons/google-logo.svg" alt="" /> Sign
                        up with Google
                    </button>
                </div>
                <div className="auth__login">
                    <p>Already have an account?</p>
                    <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
