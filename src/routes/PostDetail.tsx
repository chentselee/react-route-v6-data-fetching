import { useLoaderData, LoaderFunction, Link } from 'react-router-dom';
import type { Post } from '../models/Post';

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const post = await res.json();
  return post;
};

const PostDetail = () => {
  const post: Post = useLoaderData();
  return (
    <>
      <Link to="/posts">{'<-'}</Link>
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    </>
  );
};

export default PostDetail;
