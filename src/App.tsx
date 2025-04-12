import { Route, Routes } from 'react-router-dom';

import HomeXR from './layouts/Home';
import Test from "./layouts/Test";
import Test2 from "./layouts/Test2";

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomeXR/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/' element={<Test2/>}/>
      </Routes>
    </>
  );
}

export default App;
