'use client';

import Button from '@/components/button';
import Link from 'next/link';
import React, { FormEvent, useRef } from 'react';
import { createUserRequest } from '@/services/user/user.api';
import { PASSWORD_REGEX } from '@/global/constants';

const SignUpPage = () => {
    const authCodeInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

    const handleAccountCreate = async (event: FormEvent) => {
        event.preventDefault();

        if (
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

        const code = authCodeInputRef.current.value;
        const name = nameInputRef.current.value;
        const email = emailInputRef.current.value;

        const body = {
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
                    ref={authCodeInputRef}
                    type={'text'}
                    placeholder={'Authorization code'}
                    required={true}
                />
                <input
                    ref={nameInputRef}
                    type={'text'}
                    placeholder={'John Doe'}
                    required={true}
                />
                <input
                    ref={emailInputRef}
                    type={'email'}
                    placeholder={'email@domain.com'}
                    required={true}
                />
                <input
                    ref={passwordInputRef}
                    type={'password'}
                    placeholder={'Password'}
                    pattern={PASSWORD_REGEX}
                    required={true}
                />
                <input
                    ref={passwordConfirmInputRef}
                    type={'password'}
                    placeholder={'Confirm password'}
                    pattern={PASSWORD_REGEX}
                    required={true}
                />
                <Button type={'submit'} color={'primary'}>
                    Create
                </Button>
            </form>
            <br />

            <small>
                Already have an account? <Link href={'sign-in'}>Sign In</Link>
            </small>
        </>
    );
};

export default SignUpPage;
