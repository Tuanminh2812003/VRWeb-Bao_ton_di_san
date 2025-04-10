import { Route, Routes } from 'react-router-dom';

import HomeXR from './layouts/Home';
import Test from "./layouts/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeXR/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </>
  );
}

export default App;
