import Home from "@layouts/Home";
import Projects from "@layouts/Projects";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "src/App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "Not Found",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// function App() {
//   const [splash, setSplash] = useState(false);

//   // setTimeout(() => {
//   //   setSplash(false);
//   // }, 2500);

//   return (
//     <>
//       {/* {splash && <Splash />} */}
//       {!splash && (
//         <section className={st.main}>
//           <div className={st.frame}>
//             <Header />
//             <div>
//               <Outlet />
//             </div>
//           </div>

//           <p className={st.copyright}>© Jay Han</p>
//         </section>
//       )}
//     </>
//   );
// }

// export default App;
