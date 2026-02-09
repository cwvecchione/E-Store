function getSession(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));
    return {token, cbid};
}

/**
 * Fetches the current user's data from the server using the token and cbid stored in sessionStorage.
 *
 * @returns {Object} The parsed user object returned by the server.
 * @throws {Object} An object with `message` (response.statusText) and `status` (HTTP status code) if the HTTP response is not OK.
 */
export async function getUser(){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${browserData.cbid}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

/**
 * Fetches orders for the user stored in sessionStorage.
 *
 * @returns {any} The parsed JSON response containing the user's orders.
 * @throws {{message: string, status: number}} An object with `message` (response.statusText) and `status` (HTTP status code) when the HTTP response is not OK.
 */
export async function getUserOrders(){
    const browserData = getSession();
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders?user.id=${browserData.cbid}`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}

/**
 * Create a new order on the server for the provided cart and user.
 *
 * @param {Array} cartList - Array of cart items to include in the order.
 * @param {number} total - Total amount paid for the order.
 * @param {Object} user - User information for the order.
 * @param {string} user.name - User's full name.
 * @param {string} user.email - User's email address.
 * @param {string|number} user.id - User identifier.
 * @returns {Object} The created order object returned by the server.
 * @throws {Object} If the server responds with a non-OK status; object contains `message` (statusText) and `status` (HTTP status code).
 */
export async function createOrder(cartList, total, user){
    const browserData = getSession();
    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(order)
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/orders`, requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json();
    return data;
}