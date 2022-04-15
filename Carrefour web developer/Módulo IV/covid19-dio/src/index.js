import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import * as ServiceWorker from './service-worker'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ServiceWorker.register()
