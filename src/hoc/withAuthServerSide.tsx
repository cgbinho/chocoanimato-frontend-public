import cookie from 'next-cookies';
import axios from '../services/api';

export function withAuthServerSideProps(getServerSidePropsFunc?: Function) {
  return async (context: any) => {
    /*
    GET THE USER INFO FROM REQUEST
    */
    const user = await getUser(context);
    /*
    IF USER DOES NOT EXIST, REDIRECT TO SIGNIN
    */
    if (!user) {
      context.res.writeHead(302, {
        Location: 'sign-in'
      });
      context.res.end();
    }

    /*
    IF USER EXIST, PASS AS PROPS
    */
    if (getServerSidePropsFunc) {
      return {
        props: {
          user,
          data: await getServerSidePropsFunc(context, user)
        }
      };
    }
    return { props: { user, data: { props: { user } } } };
  };
}

async function getUser(context: any) {
  const { chocoanimatoToken, chocoanimatoUser }: any = cookie(context);

  if (chocoanimatoToken && chocoanimatoUser) {
    axios.defaults.headers.Authorization = `Bearer ${chocoanimatoToken}`;
    return chocoanimatoUser;
  }
  return null;
}
