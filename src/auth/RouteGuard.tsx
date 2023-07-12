import { ReactNode } from "react";
// import { verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
    verify: Function
    secondVerify?: Function
}

function RouteGuard({ children, verify, secondVerify }: Props) {
    if (!secondVerify) {
       if(verify()) {
        return  <>{children}</>
       } else {
        return  <Navigate
                  to="/login"
                  replace={true}
                />
       }
    } 
    if (verify() || secondVerify()) {
      return <>{children}</>
    } else {
        return <Navigate
                  to="/login"
                  replace={true}
                />
    }  
}

export default RouteGuard;


