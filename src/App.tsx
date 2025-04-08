import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Registration from "./pages/Registration/Registration"
import NotFound from "./pages/NotFound/NotFound"
import Demo from "./pages/Demo/Demo"

function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="demo" element={<Demo/>}/>
        <Route path="registration" element={<Registration/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
