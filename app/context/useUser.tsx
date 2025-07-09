import { useContext } from "react";
import { UserContext } from "./UserContext";
import { User } from "../graphql/generated/graphql";
const useUser = () => {
    const userContext = useContext(UserContext);
    const { user, loading,  logout, companyId} = userContext;
    return {
        user: user as Partial<User>,
        loading: loading as boolean,
        logout, 
        companyId
    }
};

export default useUser;
