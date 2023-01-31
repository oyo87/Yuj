import './App.css';
import { white, black } from 'tailwindcss/colors';
import MypageSidebar from './components/MypageSidebar';
import { BrowserRouter } from 'react-router-dom/dist';
import MyPage from './pages/MyPage';
import StudioPage from './pages/StudioPage';




function App() {
  return (
    // start div
    <div className="App" style={ {background : white}}> 
      <BrowserRouter>
        <MyPage>
          
        </MyPage>
        
    
      </BrowserRouter>
      {/* end div */}
    </div>
  );
}

export default App;
