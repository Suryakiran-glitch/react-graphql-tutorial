import './App.css';
import {BrowserRouter as Router , Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Menu from './components/Menu'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
      <Router>
        <Container>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        </Container>
      </Router>
  );
}

export default App;
