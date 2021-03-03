import { GetServerSidePropsContext } from 'next';
import cookie from 'next-cookies';

// Redirect if user is logged ( has cookies )
export const redirectLoggedUser = async (
  context: GetServerSidePropsContext,
  to: string
): Promise<void> => {
  const { chocoanimatoUser, chocoanimatoToken, chocoanimatoProvider } = cookie(
    context
  );
  /*  IF COOKIE EXISTS, REDIRECT USER  */
  if (chocoanimatoUser && chocoanimatoToken && chocoanimatoProvider) {
    context.res.writeHead(302, { Location: to });
    context.res.end();
  }
};

// Redirect if query is not valid
export const redirectUserWithInvalidQuery = async (
  context: GetServerSidePropsContext
): Promise<void> => {
  /*  CHECK IF THERE IS QUERY DOES NOT EXISTS  */
  if (
    !context.query?.token ||
    !context.query?.user ||
    !context.query?.provider
  ) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
  }
};
