import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: string;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  let context: string;

  if (user) {
    context = user.is_company ? 'companies' : 'users';
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (user) {
          return !!isPrivate === !!user && isPrivate === context ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/signin' : `/${context}/dashboard`,
                state: { from: location },
              }}
            />
          );
        }
        return !!isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/signin' : `/${context}/dashboard`,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
