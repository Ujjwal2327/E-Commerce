// import { useEffect } from "react"
import "./App.css"
import Footer from "./components/Layout/Footer"
import Header from "./components/Layout/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import ProductDetails from "./components/Product/ProductDetails"
// import WebFont from "webfontloader"

function App() {
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "sans-serif"],
  //     },
  //   })
  // })

  return (
    <div className="app">
      <BrowserRouter>
        <Header />

        <Routes className="routes">
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
