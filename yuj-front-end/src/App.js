import './App.css';
import { white, black } from 'tailwindcss/colors';
import MypageSidebar from './components/mypage/MypageSidebar';
import MyInfo from './pages/mypage/MyInfo';




function App() {
  return (
    // start div
    <div className="App" style={ {background : white}}> 
      <MypageSidebar />
      <MyInfo />
     {/* <MyInfo /> */}
    

      {/* end div */}
    </div>
  );
}

export default App;
