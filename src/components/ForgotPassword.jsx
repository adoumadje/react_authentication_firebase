import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch(err) {
            setError(err.message)
        }

        setLoading(false)
    }

  return (
    <>
        <Card className='w-100'>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2' id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            Reset Password
                        </Button>
                    </Form.Group>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/login'>Login</Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </>
  )
}

export default ForgotPassword