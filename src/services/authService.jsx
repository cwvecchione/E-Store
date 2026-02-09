/**
 * Authenticate a user by sending credentials to the server and persist the returned token and user id in sessionStorage.
 *
 * @param {Object} authDetail - Credentials to send in the request body (e.g., `{ email, password }`).
 * @returns {Object} Parsed JSON response from the server; may include `accessToken` and `user` properties.
 * @throws {Object} An object containing `status` (HTTP status code) and `message` (response statusText) when the request fails.
 */
export async function login(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authDetail)
    }
    const response = await fetch(`${import.meta.env.VITE_CLIENT_URL}/login`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();

    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }

    return data;
}

/**
 * Register a new user with the server using the provided authentication details.
 * @param {Object} authDetail - Object containing registration fields (e.g., email, password, name).
 * @returns {Object} Parsed JSON response from the server; may include `accessToken` and `user`.
 * @throws {Object} If the HTTP response is not OK, throws an object with `message` (response.statusText) and `status` (response.status).
 */
export async function register(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(authDetail)
    }  
    const response = await fetch(`${import.meta.env.VITE_CLIENT_URL}/register`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    
    if(data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }

    return data;
}

export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}