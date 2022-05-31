import { DataBrowserRouter, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './routes/Home';
import Posts, { loader as postsLoader } from './routes/Posts';
import PostDetail, { loader as postDetailLoader } from './routes/PostDetail';
import Slow, { loader as slowLoader } from './routes/Slow';

function App() {
  return (
    <DataBrowserRouter fallbackElement={<>Loading...</>}>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="posts" loader={postsLoader} element={<Posts />} />
        <Route
          path="posts/:postId"
          loader={postDetailLoader}
          element={<PostDetail />}
        />
        <Route path="slow" loader={slowLoader} element={<Slow />} />
      </Route>
    </DataBrowserRouter>
  );
}

export default App;
