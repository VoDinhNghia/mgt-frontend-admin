import { sessionFields } from "../constants/constant";

class AuthenService {
    setUser(user) {
        sessionStorage.setItem(sessionFields.user, JSON.stringify(user));
    }

    getCurrentUser() {
        const currentUser = sessionStorage.getItem(sessionFields.user);
        const user = currentUser ? JSON.parse(currentUser) : {};
        return user;
    }

    setAuthHeader() {
        const currentUser = this.getCurrentUser();
        const headers = {
            'Authorization': `Bearer ${currentUser?.accessToken}`,
            'Content-Type': 'application/json'
        };
        return headers;
    }

    setMultipartHeader() {
        const currentUser = this.getCurrentUser();
        const headers = {
            'Authorization': `Bearer ${currentUser?.accessToken}`,
            'Content-Type': 'multipart/form-data',
        }
        return headers;
    }
}

export default AuthenService;