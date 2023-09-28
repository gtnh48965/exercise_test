import React from 'react';
import {Route, Routes} from "react-router-dom";
import RegisterPage from "../../pages/RegisterPage";


const AppRouter = () => {
    return (
       <>
           <Routes>
               <Route path={'/'} element={<RegisterPage/>}/>
           </Routes>
       </>
    );
};

export default AppRouter;
