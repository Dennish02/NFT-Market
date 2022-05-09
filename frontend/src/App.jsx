import LandingPage from "./pages/LandingPage.jsx"
import { BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";



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
