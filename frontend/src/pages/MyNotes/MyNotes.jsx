import { useEffect } from 'react';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Badge, Accordion } from 'react-bootstrap';
import { MyNotesTitle } from './MyNotes.style';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../redux/actions/noteActions';

const MyNotes = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const { userInfo } = useSelector(state => state.userLogin);

  const noteCreate = useSelector(state => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const notesList = useSelector(state => state.notesList);
  const { loading, notes, error } = notesList;

  const noteUpdate = useSelector(state => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector(state => state.noteDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = noteDelete;

  useEffect(() => {
    dispatch(listNotes());

    if (!userInfo) {
      history.push('/');
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    successUpdate,
    deleteSuccess,
  ]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteNoteAction(id));
    }
  };
  return (
    <MainScreen title={`Welcome back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create New Note
        </Button>
      </Link>
      {deleteError && (
        <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
      )}
      {deleteLoading && <Loading />}

      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

      {notes?.map(note => (
        <Accordion key={note._id}>
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
                  {/*  */}
                  {/* <ReactMarkdown>{note.content}</ReactMarkdown> */}
                  <footer className="blockquote-footer">
                    Created on{' '}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
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
