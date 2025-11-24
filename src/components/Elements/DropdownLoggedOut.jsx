import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

export const DropdownLoggedOut = ({setDropdown}) => {
    DropdownLoggedOut.propTypes = {
        setDropdown: PropTypes.func.isRequired,
    };
    const { loginWithRedirect } = useAuth0();
    return (
        <div id="dropdownAvatar" className="select-none	absolute top-10 right-0 z-10 w-44 bg-white rounded-sm divide-y divide-gray-100 shadow-sm dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                <li>
                    <Link onClick={() => setDropdown(false)} to="/products" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All eBooks</Link>
                </li>
                <li>
                    <Link onClick={() => loginWithRedirect()} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
                </li>
                <li>
                    <Link onClick={() => setDropdown(false)} to="/register" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Register</Link>
                </li>
            </ul>
        </div>
    )
}
