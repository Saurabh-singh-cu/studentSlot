// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import Header from "./src/components/CommonComponent/Header";
// import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
// import ErrorComponent from "./src/components/CommonComponent/ErrorComponent";
// import LoginPage from "./src/components/CommonComponent/Login/LoginPage";
// import HomePage from "./src/components/HomePage";
// import { Provider } from "react-redux";
// import { store } from "./src/redux/store";

// import StudentHomePage from "./src/components/StudentComponent/StudentHomePage/StudentHomePage";

// import useOnlineStatus from "./src/components/CommonComponent/useOnlineOffline";

// const AppComponent = () => {
//   const disableRightClick = (e) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     document.addEventListener("contextmenu", disableRightClick);

//     return () => {
//       document.removeEventListener("contextmenu", disableRightClick);
//     };
//   }, []);

//   const onlineStatus = useOnlineStatus();
//   if (onlineStatus === false)
//     return (
//       <>
//         {swal({
//           title: "OOPs no internet !",
//           text: "I think you should contact to your internet provider",
//           html: true,
//         })}
//       </>
//     );
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// };

// const appRoute = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppComponent />,
//     errorElement: <ErrorComponent />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },

//       {
//         path: "/slot-book",
//         element: <StudentHomePage />,
//       },

//       {
//         path: "/login",
//         element: <LoginPage />,
//       },
//     ],
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<AppComponent />);
// root.render(
//   <Provider store={store}>
//     <RouterProvider router={appRoute} />
//   </Provider>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./src/components/CommonComponent/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./src/components/CommonComponent/ErrorComponent";
import LoginPage from "./src/components/CommonComponent/Login/LoginPage";
import HomePage from "./src/components/HomePage";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import StudentHomePage from "./src/components/StudentComponent/StudentHomePage/StudentHomePage";
import useOnlineStatus from "./src/components/CommonComponent/useOnlineOffline";
import SubjectSlot from "./src/components/StudentComponent/StudentHomePage/SubjectSlot";

const AppComponent = () => {
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <>
        {swal({
          title: "OOPs no internet !",
          text: "I think you should contact your internet provider",
          html: true,
        })}
      </>
    );
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/slot-book",
        element: <StudentHomePage />,
      },
      {
        path: "/book-slot",
        element: <SubjectSlot />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={appRoute}>
      <AppComponent />
    </RouterProvider>
  </Provider>
);




