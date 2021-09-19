import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import css from './LandingPage.module.css';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className={css.main}>
      <Container>
        <Row>
          <div className={css.introText}>
            <div>
              <h1 className={css.title}>Welcome to Notes</h1>
              <p className={css.subtitle}>One safe place for your notes</p>
            </div>

            <div className={css.buttonContainer}>
              <Link to="/login">
                <Button size="lg" className="landingButton">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  size="lg"
                  className="landingButton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
