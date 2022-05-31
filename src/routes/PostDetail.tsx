import {
  useLoaderData,
  LoaderFunction,
  Link,
  Form,
  useLocation,
} from 'react-router-dom';
import type { Post, Comment } from '../models/Post';

export const loader: LoaderFunction = async ({ request, params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await res.json();

  if (new URL(request.url).searchParams.get('showComments') === 'true') {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
    );
    const comments = await res.json();
    return { post, comments };
  }

  return { post };
};

const PostDetail = () => {
  const data: { post: Post; comments: Comment[] } = useLoaderData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showComments = searchParams.get('showComments') === 'true';
  return (
    <>
      <Link to="/posts">{'<-'}</Link>
      <article>
        <h1>{data.post.title}</h1>
        <p>{data.post.body}</p>
      </article>
      <Form action={showComments ? '' : '?showComments=true'}>
        <button type="submit">{showComments ? 'hide' : 'show'} comments</button>
      </Form>
      {data.comments &&
        data.comments.map((comment) => (
          <article key={comment.id}>
            <div>Name: {comment.name}</div>
            <div>Email: {comment.email}</div>
            <p>{comment.body}</p>
          </article>
        ))}
    </>
  );
};

export default PostDetail;
