import { Route, Routes } from 'react-router-dom'
import ThemeToggle from "./components/ThemeToggle.jsx";
import Navbar from './components/Navbar';
import Post from './components/Post';
import View from './components/View';

function App() {

  /* Testing out how to sort dates by recency
  function handleClick() { 
    let day1 = new Date('August 19, 1975 23:15:30');
    let day2 = new Date('February 19, 2010 23:15:30');
    let arr = [day2, day1];
    arr.sort(function(a, b) {
      return b - a;
    });
    console.log(arr);
  }*/

  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path='/make-a-report' element={<Post/>}></Route>
        <Route path='see-reports' element={<View/>}></Route>      
      </Routes>
      <ThemeToggle />
    </div>
    </>
  );
}

export default App;
