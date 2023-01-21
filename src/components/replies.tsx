import { useAppDispatch } from '../app/hooks';

import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { deleteReply } from '../reducers/postSlice';

import { ReplyInterface } from '../app/interfaces';


interface Props {
    replies: Array<ReplyInterface>
}

export const Replies = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const replies = props.replies;

    // called when attempting to delete a reply
    // dispatches deleteReply function from postsSlice
    const handleDelete = (reply_id: number) => {
        alert("Deleting reply " + reply_id);
        dispatch(deleteReply(reply_id));
        navigate(0);
    }

    const singleReply = (reply: ReplyInterface) => (
        <Card className="mt-3" key={reply.id}>
            <Card.Header>
                <Card.Subtitle className="d-flex justify-content-start">{reply.created_at}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text>{reply.body}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex justify-content-end">
                    <Link to={`./replies/${reply.id}/edit`} className='btn btn-success me-2'>
                        <FontAwesomeIcon icon={solid('pen')}/> Edit
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(reply.id)} className='me-2'>
                        <FontAwesomeIcon icon={solid('trash')}/> Delete
                    </Button>
                    <Link to={`/posts/${reply.post_id}`} className='btn btn-primary'>
                        <FontAwesomeIcon icon={solid('up-right-and-down-left-from-center')}/> See Post
                    </Link>
                </div>
            </Card.Footer>
        </Card>
    )

    const repliesList = replies.map(reply => (singleReply(reply)));

    return (
        <Container>
            {repliesList}
        </Container>
    )
}