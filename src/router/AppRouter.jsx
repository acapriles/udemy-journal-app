import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";


export const AppRouter = () => {

    const status = useCheckAuth();
    
    if ( status === 'checking' ) {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {/* Login and Register */}
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

            {/* Journal App */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

            {
                (status === 'authenticated')
                ? <Route path="/*" element={ <JournalRoutes /> } />
                : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to='/auth/login' /> } />
        </Routes>
    )
}
