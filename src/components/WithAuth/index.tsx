/*
COMPONENT TO CHECK IF USER IS LOGGED
*/
import Router from 'next/router';
import { IUserProps } from '../../types';

export function withAuth(Component: any) {
  return ({ user, data }: { user: IUserProps; data: any }) => {
    if (!user) {
      Router.push('/sign-in');
      // return <h1>Denied</h1>; // or redirect, we can use the Router because we are client side here
    }

    return <Component {...data.props} />;
  };
}
