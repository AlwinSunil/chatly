import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

function Login() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const loginwithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                console.log("Token :" + token)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(error)
                console.log(errorCode + " : " + errorMessage)
                console.log("Credential : " + credential)
            })
    }

    useEffect(() => {
        document.title = "Log in - Chatly"
    }, [])

    return (
        <div className="auth">
            <div className="auth__card">
                <div className="auth__header">
                    <h3>Log in</h3>
                    <button onClick={loginwithGoogle}>
                        <img
                            src="/assets/icons/google-logo.svg"
                            alt="google logo"
                        />
                        Log in with Google
                    </button>
                </div>
                <div className="auth__login">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
