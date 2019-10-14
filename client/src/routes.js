import HomePage from "./components/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Profile from "./components/Profile";

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/signOut', component: Logout },
    { path: '/dashboard', component: Dashboard, isPrivate: true },
    { path: '/profile', component: Profile, isPrivate: true }
];

export default routes;
