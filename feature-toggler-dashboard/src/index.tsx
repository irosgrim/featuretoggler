import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateAccount from './components/CreateAccount';

const query = new URLSearchParams(window.location.search);
const isCreateAccount = query.get('create-account');

ReactDOM.render(
  <React.StrictMode>
      {
        isCreateAccount && <CreateAccount />
      }
      {
        !isCreateAccount && (
          <App />
        )
      }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
