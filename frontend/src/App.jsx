// import { useEffect } from "react"
import "./App.css"
import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
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

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
