import { useState } from 'react';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import WeatherDashboard from '../Weather/WeatherDashboard';
import './style.css';

const Login = () => {
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error during sign-out: ", error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
        } catch (error) {
            console.error("Error during sign-in: ", error);
        }
    };

    return (
        <div className="login-container">
            {user ? (
                <div className="logged-in">
                    <p>Welcome, {user.displayName}!</p>
                    <WeatherDashboard />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="login">
                    <h2>Sign Up</h2>
                    <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
                </div>
            )}
        </div>
    );
};

export default Login;
