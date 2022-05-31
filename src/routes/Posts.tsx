import { useLoaderData, Link } from 'react-router-dom';
import type { Post } from '../models/Post';

export const loader = async () => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const posts = await res.json();
  return posts;
};

const Posts = () => {
  const posts: Post[] = useLoaderData();
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Link to={post.id.toString()}>
          <h2>{post.title}</h2>
        </Link>
      ))}
    </>
  );
};

export default Posts;
