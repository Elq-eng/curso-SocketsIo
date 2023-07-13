import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css';
import './index.css'
import TicketApp from './components/TicketApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TicketApp />
  </React.StrictMode>,
)
