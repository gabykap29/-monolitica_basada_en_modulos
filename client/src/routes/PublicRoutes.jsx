import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const PublicRoute = ({children}) => {
    const {auth} = useContext(AuthContext)

    return !auth.isAuthenticated ? children : <Navigate to="/IPF/dashboard/" />
}

export default PublicRoute