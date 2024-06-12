import React from "react";
import "../styles/style.css";

const NotFoundPage: React.FC = () => {
    return (
        <div className="container">
            <header className="not-found-page__header">
                <h1>404 - Page Not Found</h1>
            </header>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFoundPage;
