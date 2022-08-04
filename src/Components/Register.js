import { useState } from 'react'
import { auth } from '../Auths/Firebase'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useAuthValue } from '../Auths/Auth'

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { setTimeActive } = useAuthValue()

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false
                setError('Password tidak sesuai')
            }
        }
        return isValid
    }

    const register = e => {
        e.preventDefault()
        setError('')
        if (validatePassword()) {
            // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            navigate('/verify-email')
                        }).catch((err) => console.log(err.message))
                })
                .catch(err => setError(err.message))
        }
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <main>
            <div className='center center-mini'>
                <div className='auth'>
                    <h3>Register</h3>
                    <br></br>
                    {error && <div className='auth__error'>e-mail sudah terdaftar</div>}
                    <form onSubmit={register} name='registration_form'>
                        <input
                            className='form-login'
                            type='email'
                            value={email}
                            placeholder="Masukkan e-mail"
                            required
                            onChange={e => setEmail(e.target.value)} />

                        <input
                            className='form-login'
                            type='password'
                            value={password}
                            required
                            placeholder='Masukkan password'
                            onChange={e => setPassword(e.target.value)} />

                        <input
                            className='form-login'
                            type='password'
                            value={confirmPassword}
                            required
                            placeholder='Konfirmasi password'
                            onChange={e => setConfirmPassword(e.target.value)} />

                        <button className='submit-btn' type='submit'>Register</button>
                    </form>
                    <p className='here'>
                        Sudah punya akun? <Link to='/login'>login disini</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register