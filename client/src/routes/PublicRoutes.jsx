import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom"

const PublicRoute = ({children}) => {
    const {auth} = useContext(AuthContext)

    return !auth.isAuthenticated ? children : <Navigate to="/IPF/home/" />
}

export default PublicRoute