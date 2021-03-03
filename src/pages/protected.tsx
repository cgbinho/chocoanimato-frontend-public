// protected.tsx
import { GetServerSideProps, GetStaticProps } from 'next';
import { withAuth } from '../components/WithAuth';
import { withAuthServerSideProps } from '../hoc/withAuthServerSide';

interface User {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
}

function protectedPage({ user, data }: { user: User; data: any }) {
  return <h1>Hello {user.name}</h1>;
}

export default withAuth(protectedPage);
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();

// export const getServerSideProps = withAuthServerSideProps();
