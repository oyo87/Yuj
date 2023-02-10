import './App.css';
import { white, black } from 'tailwindcss/colors';
import { BrowserRouter, Routes } from 'react-router-dom/dist';
import { Route } from 'react-router-dom';
import MainRouter from './pages/MainRouter';



function App() {
  return (
    // start div
    <div className="App" style={{background : white}}> 

      <BrowserRouter>
        <Routes>
          <Route path='*' element={<MainRouter />}/>
        </Routes>
      </BrowserRouter>
      
      {/* end div */}
    </div>
  );
}

export default App;
