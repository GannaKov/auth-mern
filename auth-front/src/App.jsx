import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import NotFound from "./pages/NotFound/NotFound";
import UserMenu from "./components/UserMenu/UserMenu";
import AppBar from "./components/AppBar/AppBar";

import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader() {
    //   // Our root route always provides the user, if logged in
    //   return { user: fakeAuthProvider.username };
    // },
    element: <AppBar isLoggedIn={false} />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register",
        // action: loginAction,
        // loader: loginLoader,
        element: <RegisterPage />,
      },
      {
        path: "login",
        // action: loginAction,
        // loader: loginLoader,
        element: <LoginPage />,
      },
      {
        path: "contact",
        // loader: protectedLoader,
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/logout",
    // async action() {
    //   // We signout in a "resource route" that we can hit from a fetcher.Form
    //   await fakeAuthProvider.signout();
    //   return redirect("/");
    // },
  },
  { path: "*", element: <AppBar isLoggedIn={true} /> }, //change
]);

const App = () => {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
};

export default App;
