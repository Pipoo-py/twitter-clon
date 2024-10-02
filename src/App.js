import './App.css';
import { PublicationScroll } from './components/PublicationScroll';
import { NavBar } from './components/NavBar';
import { NewPost } from "./components/NewPost";
import { ComponentPublicationsContext } from './components/GlobalPublicationsContext';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import { useContextOfTheme } from './components/ThemeContext';

function App() {
  const { dark } = useContextOfTheme();

  return (
    <ComponentPublicationsContext>
      <HashRouter>
      <div className={`App ${ dark == false ? "dark" : "".trim() }`}>
        <NavBar />
        <Routes>
          <Route path= "/" element = {
          <main className="main">
            <NewPost />
            <PublicationScroll />
          </main>
          }/>
          <Route path="/post" element={<NewPost />}/>
        </Routes>
        </div>
        </HashRouter>
      </ComponentPublicationsContext>
  );
}

export default App;
