import React, {useEffect} from 'react';
import HomePage from './pages/homepage';
import SettingsPage from './pages/settingspage'
import ProfilePage from './pages/profilepage';
import TopBar from './topbar';
import { getTheme } from './utilities/theme';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import LoginPage from './pages/loginpage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditObjectPage from './pages/editobjectpage/editobjectpage';

function Primary() {
    useEffect(() => {
        const onThemeChange = () => {
            const theme = getTheme();
            document.documentElement.setAttribute('data-theme', theme.getThemeClass())
        }
        onThemeChange();

        const themeCheck = window.matchMedia("(prefers-color-scheme: dark)");
        themeCheck.addEventListener('change', onThemeChange);
        
        return () => themeCheck.removeEventListener('change', onThemeChange);
    }, []);

    const clientId = '1043801174884-67ssj775bc8cg0mhqq96q99igchvjrbg.apps.googleusercontent.com';
    return (
        <Router>
            <GoogleOAuthProvider clientId={clientId}>
                <div className="min-h-screen bg-primary flex flex-col ">
                    <div className="font-content bg-primary text-primary flex-1 flex flex-col"> 
                        <Routes>
                            <Route 
                                path="/"
                                element={(<>
                                    <TopBar isGlassy={true} />
                                    <HomePage />
                                </>)} 
                            />
                            <Route 
                                path="/login"
                                element={(<>
                                    <TopBar isGlassy={true} />
                                    <LoginPage />
                                </>)} 
                            />
                            <Route 
                                path="/profile"
                                element={(<>
                                    <TopBar isGlassy={false} />
                                    <ProfilePage />
                                </>)}
                            />
                            <Route 
                                path="/settings"
                                element={(<>
                                    <TopBar isGlassy={true} />
                                    <SettingsPage />
                                </>)} 
                            />
                            <Route 
                                path="/editobject"
                                element={(<>
                                    <TopBar isGlassy={true} />
                                    <EditObjectPage />
                                </>)} 
                            />
                        </Routes>
                        
                    </div>
                </div>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default Primary;