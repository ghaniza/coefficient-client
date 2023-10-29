'use client';

import Button from '@/components/button';
import Link from 'next/link';
import React, { FormEvent, useRef } from 'react';
import { createUserRequest } from '@/services/user/user.api';

const SignUpPage = () => {
    const serviceUrlInputRef = useRef<HTMLInputElement>(null);
    const authCodeInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

    const handleAccountCreate = async (event: FormEvent) => {
        event.preventDefault();

        if (
            !serviceUrlInputRef.current ||
            !authCodeInputRef.current ||
            !nameInputRef.current ||
            !emailInputRef.current ||
            !passwordInputRef.current ||
            !passwordConfirmInputRef.current
        )
            return;

        const password = passwordInputRef.current.value;
        const passwordConfirm = passwordConfirmInputRef.current.value;

        if (password !== passwordConfirm) {
            alert('Password does not match');
            return;
        }

        const url = serviceUrlInputRef.current.value;

        if (!url) {
            alert('Service URL not provided');
            return;
        }

        const code = authCodeInputRef.current.value;
        const name = nameInputRef.current.value;
        const email = emailInputRef.current.value;

        const body = {
            url,
            code,
            name,
            email,
            password,
        };

        const response = await createUserRequest(body);
        if (!response) return alert('Failed to create account');

        alert('Account created successfully');
    };

    return (
        <>
            <h1>Sign Up</h1>
            <span>Create a new account</span>
            <form onSubmit={handleAccountCreate}>
                <input
                    ref={serviceUrlInputRef}
                    type={'url'}
                    placeholder={'http://service.url'}
                />
                <input
                    ref={authCodeInputRef}
                    type={'text'}
                    placeholder={'Authorization code'}
                />
                <input
                    ref={nameInputRef}
                    type={'text'}
                    placeholder={'John Doe'}
                />
                <input
                    ref={emailInputRef}
                    type={'email'}
                    placeholder={'email@domain.com'}
                />
                <input
                    ref={passwordInputRef}
                    type={'password'}
                    placeholder={'Password'}
                />
                <input
                    ref={passwordConfirmInputRef}
                    type={'password'}
                    placeholder={'Confirm password'}
                />
                <Button type={'submit'} color={'secondary'}>
                    Create
                </Button>
            </form>
            <small>
                Already have an account? <Link href={'sign-in'}>Sign In</Link>
            </small>
        </>
    );
};

export default SignUpPage;
