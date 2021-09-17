import { Header, Footer } from './components';
import { LandingPage, MyNotes } from './pages';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route exact path="/" component={LandingPage} />
      <Route path="/mynotes" component={MyNotes} />
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
