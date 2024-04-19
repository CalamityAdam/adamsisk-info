import { Route, Switch } from 'wouter';
import { routes } from './routes';

export const Router = () => (
  <Switch>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} component={route.component} />
    ))}
  </Switch>
);
