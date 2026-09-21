
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import Footer from './component/Footer'

function App() {

  return (
    <>
      <Navbar />
      <div className="bg-white [background:radial-gradient(150%_150%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
