import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch(err) {
            setError(err.message)
        }

        setLoading(false)
    }

  return (
    <>
        <Card className='w-100'>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2' id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className='mb-2' id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Login</Button>
                    </Form.Group>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/forgot-password'>forgot password?</Link>
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

export default Login