import { useRoutes, RouteDefinition, Router } from "solid-app-router";
import { HopeProvider } from '@hope-ui/solid';
import { Component, lazy, onCleanup, onMount } from 'solid-js';

import { Header } from './Header';
import { NavigationBar } from './NavigationBar';
import { useWindowSize } from "../stores/useWindowSize";

const routes: Array<RouteDefinition> = [
    { path: '/treck-subject',   component: lazy(() => import('./TrackingPage')) },
    { path: '/tasks-statistics', component: lazy(() => import('./TasksProgessPage')) },
]

const App: Component = () => {
    const windowSize = useWindowSize();
    const Routes = useRoutes(routes);

    return (
        <HopeProvider>
            <Router>
                { windowSize() > 768 ? <Header /> : <NavigationBar /> }
                <Routes />
            </Router>
        </HopeProvider>
  );
};

export default App;
