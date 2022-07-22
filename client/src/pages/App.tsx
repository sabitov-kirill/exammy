// Sabitov Kirll, 6/11/2022

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { NavigationBar } from "../components/NavigationBar";
import { useWindowSize } from "../hooks/useWindowSize";
import { Loading } from "../components/Loading";
import { AnimatePresence } from "framer-motion";

// Application pages routes
const pagesRoutes = [
    { path: '/',               Component: React.lazy(() => import('./MainPage')) },
    { path: '/statistics',     Component: React.lazy(() => import('./StatisticsPage')) },
    { path: '/tasks-session',  Component: React.lazy(() => import('./TrackingSession')) },
];

const AnimatedRouts = () => {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key}>
            {pagesRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            </Routes>
        </AnimatePresence>
    );
}

export const App = () => {
    const windowSize = useWindowSize();

    return (
        <BrowserRouter>
            {windowSize > 768 ?
             <Header /> : <NavigationBar />}
            <React.Suspense fallback={<Loading />}>
            <AnimatedRouts />
            </React.Suspense>
        </BrowserRouter>
    );
}
