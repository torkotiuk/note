import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNoteAction,
  updateNoteAction,
} from '../../redux/actions/noteActions';
import ReactMarkdown from 'react-markdown';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import axios from 'axios';

function UpdateNote({ history, match }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const noteUpdate = useSelector(state => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector(state => state.noteDelete);
  const { loading: deleteLoading, error: deleteError } = noteDelete;

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete')) {
      dispatch(deleteNoteAction(id));
    }
    history.push('/mynotes');
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle('');
    setCategory('');
    setContent('');
  };

  const updateHandler = e => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push('/mynotes');
  };

  return (
    <MainScreen title="Edit the Note">
      <Card>
        <Card.Header>Edit the current Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {/* form is starting */}
            {/* {deleteError && (
              <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
            )}
            {deleteLoading && <Loading />} */}

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={e => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Update Note
            </Button>
            <Button
              className="mx-2"
              onClick={() => deleteHandler(match.params.id)}
              variant="danger"
            >
              Delete Note
            </Button>
            {/* Finish of the form */}
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateNote;
