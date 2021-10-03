import { Header, Footer } from './components';
import {
  CreateNote,
  LandingPage,
  LoginPage,
  MyNotes,
  RegisterPage,
  UpdateNote,
} from './pages';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';
const App = () => {
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/note/:id" component={UpdateNote} />
        <Route path="/mynotes" component={() => <MyNotes search={search} />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
