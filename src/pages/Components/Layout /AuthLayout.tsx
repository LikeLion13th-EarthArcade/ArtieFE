import { Outlet } from 'react-router-dom';
import Footer from '../LayoutComponents/Footer';

export default function AuthLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
