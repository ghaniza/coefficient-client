import React from 'react';
import { Roboto } from 'next/font/google';
import styles from './login.module.scss';
import '@/app/(login)/login-layout.scss';

const inter = Roboto({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className={styles.container}>
                    <div className={styles.form}>{children}</div>
                    <div className={styles.image}></div>
                </div>
            </body>
        </html>
    );
}
