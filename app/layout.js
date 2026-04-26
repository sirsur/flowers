import './globals.css';
import { CartProvider } from '../pages/context/CartContext';

export const metadata = {
    title: 'Flowers | Упаковка',
    description: 'Все для упаковки цветов',
};

export default function RootLayout({ children }) {
    return (
        <html lang='ru'>
            <body>
                <CartProvider>{children}</CartProvider>
            </body>
        </html>
    );
}
