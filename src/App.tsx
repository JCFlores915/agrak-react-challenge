import { FC } from "react";
import { Outlet } from 'react-router';
import { Header } from "./issues/components/Header";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export const App: FC = () => {

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
