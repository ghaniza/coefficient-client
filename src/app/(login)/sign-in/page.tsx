'use client';

import Button from '@/components/button';
import React, { useEffect, useRef } from 'react';
import { authenticate } from '@/services/authentication';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInPage = () => {
    const serviceUrlRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const requestPermission = async () => {
        const { requestPermission, isPermissionGranted } = await import(
            '@tauri-apps/api/notification'
        );

        let permissionGranted = await isPermissionGranted();

        if (!permissionGranted) {
            const permission = await requestPermission();
            console.log(permission);
        }
    };

    const loadVariables = () => {
        if (
            !serviceUrlRef.current ||
            !usernameRef.current ||
            !passwordRef.current
        )
            return;

        const service = localStorage.getItem('service-url');
        if (!service) return;

        serviceUrlRef.current.value = service;

        const username = localStorage.getItem('username');
        if (!username) return;

        usernameRef.current.value = username;
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        if (
            !serviceUrlRef.current ||
            !usernameRef.current ||
            !passwordRef.current
        )
            return;

        const serviceUrl = serviceUrlRef.current.value;
        if (!serviceUrl) return;

        const url = new URL(serviceUrl);

        const service = url.origin;

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        const response = await authenticate(service, username, password);

        if (response) {
            localStorage.setItem('service-url', service);
            localStorage.setItem('username', username);

            localStorage.setItem('access', response.access_token);
            localStorage.setItem('refresh', response.refresh_token);
            localStorage.setItem('exp', response.exp);

            router.push('/home');
        } else {
            alert('Invalid credentials');

            localStorage.removeItem('service-url');
            localStorage.removeItem('username');
        }
    };

    useEffect(() => {
        loadVariables();
        requestPermission().catch();
    }, [serviceUrlRef, usernameRef, passwordRef]);

    return (
        <>
            <h1>Hello!</h1>
            <span>Login to your account</span>
            <form onSubmit={handleLogin}>
                <input
                    ref={serviceUrlRef}
                    placeholder={'Service URL'}
                    type={'url'}
                    required={true}
                />
                <input
                    ref={usernameRef}
                    placeholder={'Username'}
                    type={'email'}
                    required={true}
                />
                <input
                    ref={passwordRef}
                    placeholder={'Password'}
                    type={'password'}
                    required={true}
                />
                <Button color={'primary'} type={'submit'}>
                    Enter
                </Button>
            </form>
            <br />
            <small>
                <Link href={'reset-password'}>Forgot my password</Link>
            </small>
            <small>
                Need an account? <Link href={'sign-up'}>Sign Up</Link>
            </small>
        </>
    );
};

export default SignInPage;
