'use client';

import React, { FormEvent, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import { resetPasswordRequest } from '@/services/user/user.api';
import { redirect } from 'next/navigation';

const ResetPasswordPage = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);

    const handleSendResetEmail = async (event: FormEvent) => {
        event.preventDefault();

        if (!emailInputRef.current) return;

        const email = emailInputRef.current.value;

        if (!email) return alert('Please enter a valid email and try again');

        const response = await resetPasswordRequest(email);
        if (!response)
            return alert('The request failed, please try again later');

        alert(
            'If everything is correct, you will receive an email with the next steps to reset your password. Make sure to check your spam fold too.'
        );

        redirect('sign-in');
    };

    return (
        <>
            <h1>Forgot my password</h1>
            <span>Enter your email</span>
            <form onSubmit={handleSendResetEmail}>
                <input
                    ref={emailInputRef}
                    type={'email'}
                    placeholder={'email@domain.com'}
                />
                <Button type={'submit'} color={'primary'}>
                    Send
                </Button>
            </form>
            <br />
            <small>
                Already have an account? <Link href={'sign-in'}>Sign In</Link>
            </small>
            <small>
                Need an account? <Link href={'sign-up'}>Sign Up</Link>
            </small>
        </>
    );
};

export default ResetPasswordPage;
