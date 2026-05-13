import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Home, Landing, MealsPage } from './pages';
import { Header, Footer, SideNavbar } from './components';
import './App.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return(
    <>
      <Header />
      <SideNavbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-14'}`}>
        <Routes>
          <Route path='/' element={<Landing /> } />
          <Route path='/home' element={<Home /> } />
          <Route path='/meals' element={<MealsPage />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
