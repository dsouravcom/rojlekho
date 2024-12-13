import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import api from "../api/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user data from the backend on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user/profile");
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;
