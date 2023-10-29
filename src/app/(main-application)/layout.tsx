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
            <body className={inter.className}>
                <Sidebar />
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
