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
            <img
              style={{ width: '40%' }}
              alt="logo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADMklEQVR4nO2bT6gVVRzHPz99PSktRKSEQiyiHigulFpYgpoFL2qRUbugTWXrti10Ibhwo9taVAsLWkmkpdAzV2YRWRFYVBqUBEUhmfK092kx0+bx7n33zp1zZ8bOBy53cc75/fmemd+Ze88ZyGT+10TTAdSBugaYBu4GZoEvgOMRMdtoYKlRJ9UD6lULrpcf1Z/VXU3HmAx1Qj1WJvuaul5dqi5Xp9VP1Tn1paZjTYL6apn8iz3al6nvq7Pq+nHHl5Ty0v9DfW+Rfneol9Q3xhXbWFC3lrP/9AB931Ev9mqf6DNwB3BvxRhTs7n8PjdA32+BZ9WJiLg+v7GnAMAxYLJCcONk1QB9VgN/L5Q89BdgEjgEHKwQWGpuBc4ATwGnenVSlwJPAqeH9lDeY3uqRpga9c1y/d/Up8+eQWvFQoPbLsCOMsZf1el5bTer+8rngHf72el3C7SWcl1/GzgPXAKOqueAs8AKYAuwEngL2F3VSSuvAHVDOevn1XXqTepz6i/qFfVz9XX14VEdtU4AdUq9qF5Q75nXNqPODGtzSX3hpUWdAmaAa8D2iPihDrudECBV8tABARZI/vs67XdhFThEkfy2Omf+P7ogwAvA5Yj4LYXx1gsQERdS2m99DUhNFqDpAJomC1BlkPql1biqbqk7iVGougrsBzZWGHcZ+KaizyRUEiAiDgOHa46lEXINaDqAphl3ERyVOfWVOgUYdxEclTngaJ0GcxFsOoCmyQJUGZSLYC6CuQjeMGQBqgzKRTAXwVwEbxhauy9g8dfZ1iGGrAV+GtZPawUA9gI7hxzz1bBO2nwLTAAnYxGAh4C/gO+Al4d10mYBFkV9EPgA+B14NCJ6HojsRWcFUDdSnGX8k2LbvNIeYicFUO8DPgSuUCT/Y1VbbS6CC6KuBU5QTN4jox6Y6JQA6l3ASeAWipkfeZOlMwKotwPHKc4H74yIr+uw2wkB1JUU1f5O4LGI+Kwu260XQL2NYubvBx6PiE/qtN92AZZT/PrbADwRER/X7aDtAjxA8Rrcroj4KIWDnu8Nqv/Q/HPCNeCZiDiSykE/AZ4HplI5HgCBE6lmPpPJAPAvLUxh/xJNu30AAAAASUVORK5CYII="
            ></img>
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
