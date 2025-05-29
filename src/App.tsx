import { Route, Routes } from 'react-router-dom';

import HomeXR from './layouts/Home';
import Test from "./layouts/Test";
import Test2 from "./layouts/Test2";

import Virtouria_Bia from "./layouts/Virtouria/Bia";
import Virtouria_DenLong from "./layouts/Virtouria/DenLong";

function App() {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomeXR/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/' element={<Test2/>}/>
        <Route path='/virtouria/bia' element={<Virtouria_Bia/>}/>
        <Route path='/virtouria/denlong' element={<Virtouria_DenLong/>}/>

      </Routes>
    </>
  );
}

export default App;
