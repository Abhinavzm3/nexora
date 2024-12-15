import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import io from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const [socket, setSocket] = useState(null); // Manage socket in React state
  const { authUser } = useSelector((store) => store.user); // Access authenticated user from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      // Establish socket connection
      const newSocket = io("http://localhost:4000/", {
        query: { userId: authUser._id },
      });
      setSocket(newSocket); // Save socket in state

      // Listen for online users
      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers)); // Update online users in Redux
      });

      // Cleanup socket on unmount or when authUser changes
      return () => {
        if (newSocket) {
          newSocket.close();
          setSocket(null);
        }
      };
    }
  }, [authUser, dispatch]);

  return (
    <div className="App h-screen items-center">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
