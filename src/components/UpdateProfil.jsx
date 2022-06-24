import React, {useRef, useState} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom'

const UpdateProfil = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        setError('')
        const promises = []

        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value))
        }

        if(passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch((err) => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

  return (
    <>
        <Card className='w-100'>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {loading && <div class="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}></div>
                            </div>
                }
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-2' id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                    </Form.Group>
                    <Form.Group className='mb-2' id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            ref={passwordRef} 
                            placeholder='Leave blank to keep the same'
                        />
                    </Form.Group>
                    <Form.Group className='mb-2' id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control 
                            type="password" 
                            ref={passwordConfirmRef} 
                            placeholder='Leave blank to keep the same'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">
                            Update
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
        </div>
    </>
  )
}

export default UpdateProfil