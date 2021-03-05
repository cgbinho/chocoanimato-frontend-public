// protected.tsx
import { withAuth } from '../components/WithAuth';
import { withAuthServerSideProps } from '../hoc/withAuthServerSide';

interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
}

function ErrorPage({ user, data }: { user: User; data: any }) {
  // function protectedPage({ props }) {
  return <h1>Ocorreu um erro!</h1>;
}

export default ErrorPage;
