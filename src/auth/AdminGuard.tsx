import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

function AdminGuard({ children }: Props) {
    function isNotAdmin(): boolean {
        const admin = localStorage.getItem('admin');
        return !admin || admin === 'false'
    }

    return isNotAdmin() ? (
        <Navigate
            to="/"
            replace={true}
        />
    ) : (
        <>{children}</>

    )
}

export default AdminGuard;