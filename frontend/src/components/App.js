import React, { useState } from "react";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SingUp";

const App = () => {
    const [page, setPage] = useState("SignIn");
    if (page === "SignIn") {
        return <SignIn setPage={setPage} />;
    } else if (page === "SignUp") {
        return <SignUp setPage={setPage} />;
    }
    else if(page === "Main"){
        return <div>signed in</div>
    }
};
export default App;
