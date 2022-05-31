import { useLoaderData } from 'react-router-dom';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

export const loader = async () => {
  await sleep(5000);
  return 'done';
};

const Slow = () => {
  const data: string = useLoaderData();
  return (
    <article>
      <h1>Slow</h1>
      <div>{data}</div>
    </article>
  );
};

export default Slow;
