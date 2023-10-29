'use client';

import React, { FormEvent, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import { resetPasswordRequest } from '@/services/user/user.api';

const ResetPasswordPage = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const serviceUrlRef = useRef<HTMLInputElement>(null);

    const handleSendResetEmail = async (event: FormEvent) => {
        event.preventDefault();

        if (!emailInputRef.current || !serviceUrlRef.current) return;

        const url = serviceUrlRef.current.value;
        const email = emailInputRef.current.value;
        if (!url || !email) throw new Error('failed');

        const response = await resetPasswordRequest(url, email);
        if (!response) throw new Error('failed');
    };

    return (
        <>
            <h1>Forgot my password</h1>
            <span>Enter your email</span>
            <form onSubmit={handleSendResetEmail}>
                <input
                    ref={serviceUrlRef}
                    type={'url'}
                    placeholder={'https://service.url'}
                />
                <input
                    ref={emailInputRef}
                    type={'email'}
                    placeholder={'email@domain.com'}
                />
                <Button type={'submit'} color={'secondary'}>
                    Send
                </Button>
            </form>
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
