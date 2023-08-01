import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './css/reset.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
reportWebVitals();

// 這個檔案都不用動內容，要加路由去App.js裡面加