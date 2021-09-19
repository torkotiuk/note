import { Header, Footer } from './components';
import { LandingPage, LoginPage, MyNotes, RegisterPage } from './pages';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/mynotes" component={MyNotes} />
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
