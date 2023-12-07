import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
import { FlashProvider } from "./contexts/FlashContext";
import { AuthProvider } from './components/AuthenticationState'; // Ensure this path is correct

// Create a root.
const root = createRoot(document.getElementById("root"));

// Render your app within the root.
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <FlashProvider>
                        <App />
                    </FlashProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
