import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../page/Home';
import SignUpPage from '../page/SignUpPage';
import LoginPage from '../page/LoginPage';
import Profile from '../page/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage />,
    errorElement: <LoginPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
