import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainContactsPage from './Components/mainContactsPage';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { UserSessionContextProvider } from './Components/Context';


function App() {

  return <div className="App">
    <BrowserRouter>
      <UserSessionContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/contact' element={<MainContactsPage/>}
        />
      </Routes>
      </UserSessionContextProvider>
    </BrowserRouter>
  </div>
}

export default App;
