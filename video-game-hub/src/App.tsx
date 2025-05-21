import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactNode } from "react";

import { Home } from "./pages/Home.tsx";
import { Navbar } from "./components/Navbar.tsx";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home /> as ReactNode} />
            </Routes>
        </Router>
    );
}
