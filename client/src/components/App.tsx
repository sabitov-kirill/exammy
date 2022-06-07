import { useRoutes, RouteDefinition, Router } from "solid-app-router";
import { HopeProvider, NotificationsProvider } from '@hope-ui/solid';
import { Component, lazy, onCleanup, onMount } from 'solid-js';

import { Header } from './Header';
import { NavigationBar } from './NavigationBar';
import { createWindowSize } from "../utils/createWindowSize";

const routes: Array<RouteDefinition> = [
    { path: '/',                 component: lazy(() => import('./MainPage')) },
    { path: '/treck-subject',    component: lazy(() => import('./TrackingPage')) },
    { path: '/tasks-statistics', component: lazy(() => import('./TasksProgessPage')) },
]

const App: Component = () => {
    const windowSize = createWindowSize();
    const Routes = useRoutes(routes);

    return (
        <HopeProvider>
        <Router>
            <NotificationsProvider>
                { windowSize() > 768 ?
                    <Header /> :
                    <NavigationBar /> }
            </NotificationsProvider>
            <Routes />
        </Router>
        </HopeProvider>
  );
};

export default App;
