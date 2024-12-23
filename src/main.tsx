import { createRoot } from "react-dom/client";
import App from "src/App";
import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: "Not Found",
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "projects",
//         element: <Projects />,
//       },
//       {
//         path: "info",
//         element: <Info />,
//       },
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//       {
//         path: "faq",
//         element: <FAQ />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // <RouterProvider router={router} />
  // </StrictMode>
  <App />
);
