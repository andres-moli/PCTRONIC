import { useContext } from "react";
import { UserContext } from "./UserContext";
import { User } from "../graphql/generated/graphql";
const useUser = () => {
    const userContext = useContext(UserContext);
    const { user, loading,  logout, companyId, saveUser} = userContext;
    return {
        user: user as Partial<User>,
        loading: loading as boolean,
        logout, 
        saveUser,
        companyId
    }
};

export default useUser;
