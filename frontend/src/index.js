import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import { Provider } from "react-redux"
import store from "./redux/store"
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
        <Toaster />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
)
