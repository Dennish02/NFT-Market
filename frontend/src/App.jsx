import LandingPage from "./pages/LandingPage.jsx"
import { BrowserRouter as Router,
  Routes,
  Route,
  Link } from 'react-router-dom';
import Home from "./componentes/home/Home.jsx";



function App() {
  
  return (
    <Router>
      <Routes>
        <Route  path='/' element={<LandingPage/>}/>
        
        <Route path='/home' element={<Home/>}/>
          
        
        
      
      </Routes>
     
    
     
    </Router>

    
  )
}

export default App
