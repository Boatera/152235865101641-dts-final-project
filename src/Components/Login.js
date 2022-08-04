import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../Auths/Firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../Auths/Auth'


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setTimeActive } = useAuthValue()
    const navigate = useNavigate()

    const login = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (!auth.currentUser.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            navigate('/verify-email')
                        })
                        .catch(err => console.log(err.message))
                } else {
                    navigate('/')
                }
            })
            .catch(err => setError(err.message))
    }

    return (
        <main>
            <div className='center center-mini'>
                <div className='auth'>
                    <h3>Log in</h3>
                    <br></br>
                    {error && <div className='auth__error'>e-mail dan/atau password tidak sesuai</div>}
                    <form onSubmit={login} name='login_form' className="login-form">
                        <input
                            className='form-login'
                            type='email'
                            value={email}
                            required
                            placeholder="Masukkan e-mail"
                            onChange={e => setEmail(e.target.value)} />

                        <input
                            className='form-login'
                            type='password'
                            value={password}
                            required
                            placeholder='Masukkan password'
                            onChange={e => setPassword(e.target.value)} />

                        <button className="submit-btn" type='submit'>Login</button>
                    </form>
                    <p className='here'>
                        Belum punya akun? <Link to='/register'>Buat disini</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login