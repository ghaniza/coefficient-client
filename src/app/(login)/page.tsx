'use client';
import Button from '@/components/button';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/services/authentication';

import styles from './login.module.scss';
import { makeIO } from '@/services/socket-io';

const LoginPage = () => {
    const serviceUrlRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const requestPermission = async () => {
        let permissionGranted = await (
            window as any
        ).__TAURI__.notification.isPermissionGranted();
        if (!permissionGranted) {
            const permission = await (
                window as any
            ).__TAURI__.notification.requestPermission();
            console.log(permissionGranted);
        }

        console.log(permissionGranted);
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

        const service = serviceUrlRef.current.value;
        if (!service) return;

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
            localStorage.removeItem('service-url');
            localStorage.removeItem('username');
        }
    };

    useEffect(() => {
        loadVariables();
        requestPermission().catch();
    }, [serviceUrlRef, usernameRef, passwordRef]);

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Hello!</h1>
                <span>Login to your account</span>
                <form onSubmit={handleLogin}>
                    <input
                        ref={serviceUrlRef}
                        placeholder={'Service URL'}
                        type={'url'}
                    />
                    <input
                        ref={usernameRef}
                        placeholder={'Username'}
                        type={'email'}
                    />
                    <input
                        ref={passwordRef}
                        placeholder={'Password'}
                        type={'password'}
                    />
                    <Button color={'secondary'} type={'submit'}>
                        Enter
                    </Button>
                    <small>
                        <a href={'#'}>Forgot my password</a>
                    </small>
                    <small>
                        Need an account? <a href={'#'}>Signup</a>
                    </small>
                </form>
            </div>
            <div className={styles.image}></div>
        </div>
    );
};

export default LoginPage;
