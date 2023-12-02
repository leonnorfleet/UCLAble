import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Post from './components/Post.js';
import View from './components/View.js';
import Home from './components/Home.js'

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
        <Route path='/see-reports' element={<View/>}></Route>
        <Route path='/' element={<Home/>}></Route>    
      </Routes>
    </div>
    </>
  );
}

export default App;
