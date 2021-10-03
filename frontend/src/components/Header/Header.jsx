import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import css from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

const Header = ({ setSearch }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            Notes Notes Notes Notes
            {/* <img src={logo} className={css.logo} alt="Logo" /> */}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={css.NavBar}>
          <Nav className="m-auto">
            <Form inline onChange={e => setSearch(e.target.value)}>
              <FormControl type="text" placeholder="Search" />
            </Form>
          </Nav>

          {userInfo ? (
            <Nav>
              <Nav.Link>
                <Link to="/mynotes">My notes</Link>
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
