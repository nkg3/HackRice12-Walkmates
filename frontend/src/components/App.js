import React, { useState } from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SingUp";
import Main from "../pages/Main";

const App = () => {
    const [page, setPage] = useState("signIn");

    if (page === "SignIn") {
        return <SignIn setPage={setPage} />;
    } else if (page === "SignUp") {
        return <SignUp setPage={setPage} />;
    }
    else if(page === "Main"){
        return <Main setPage={setPage} />;
    }
};
export default App;
