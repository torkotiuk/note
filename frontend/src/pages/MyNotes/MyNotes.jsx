import { MainScreen } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Card, Badge, Accordion } from 'react-bootstrap';
import { MyNotesTitle } from './MyNotes.style';
import { notes } from '../../tempData/notes';

const MyNotes = () => {
  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete')) {
      //
    }
  };
  return (
    <MainScreen title="Welcome back user123...">
      <Link to="/createnote">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create New Note
        </Button>
      </Link>

      {notes.map(note => (
        <Accordion>
          <Card key={note._id} style={{ margin: 10 }}>
            <Card.Header style={{ display: 'flex' }}>
              <span style={MyNotesTitle}>
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {note.title}
                </Accordion.Toggle>
              </span>
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  {note.content}
                  {/* <ReactMarkdown>{note.content}</ReactMarkdown> */}
                  <footer className="blockquote-footer">
                    Created on
                    <cite title="Source Title">
                      {/* {note.createdAt.substring(0, 10)} */}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
