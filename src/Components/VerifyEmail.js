import { useAuthValue } from '../Auths/Auth'
import { useState, useEffect } from 'react'
import { auth } from '../Auths/Firebase'
import { sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function VerifyEmail() {

    const { currentUser } = useAuthValue()
    const [time, setTime] = useState(60)
    const { timeActive, setTimeActive } = useAuthValue()
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            currentUser?.reload()
                .then(() => {
                    if (currentUser?.emailVerified) {
                        clearInterval(interval)
                        navigate('/')
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }, 1000)
    }, [navigate, currentUser])

    useEffect(() => {
        let interval = null
        if (timeActive && time !== 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1)
            }, 1000)
        } else if (time === 0) {
            setTimeActive(false)
            setTime(60)
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timeActive, time, setTimeActive])

    const resendEmailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setTimeActive(true)
            }).catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <main>
            <div className='center center-mini'>
                <div className='verifyEmail'>
                    <h3>Verifikasi Alamat E-mail</h3>
                    <p>
                        <strong>Sebuah e-mail telah dikirimkan ke:</strong><br />
                        <span>{currentUser?.email}</span>
                    </p>
                    <span>Ikuti instruksi yang diberikan untuk melakukan verifikasi e-mail</span>
                    <button
                        className='submit-btn'
                        onClick={resendEmailVerification}
                        disabled={timeActive}
                    >Kirim Ulang {timeActive && time}</button>
                </div>
            </div>
        </main>
    )
}

export default VerifyEmail
