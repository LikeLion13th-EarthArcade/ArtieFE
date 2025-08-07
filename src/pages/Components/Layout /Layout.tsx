import { Outlet } from 'react-router-dom';
import Navbar from '../LayoutComponents/Navbar';
import Footer from '../LayoutComponents/Footer';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                <Outlet /> {/* 또는 Routes */}
            </main>

            <Footer />
        </div>
    );
}
