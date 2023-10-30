import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/sidebar';

import '../globals.scss';

const inter = Roboto({ weight: ['100', '400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CoEfficient',
    description: 'Collaboration tool',
};

const RootLayout: FCC = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>Chat</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={'anonymous'}
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className={inter.className}>
                <Sidebar />
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
