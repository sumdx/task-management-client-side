
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar';

const Root = () => {
    return (
        <div>
            <NavBar className="fixed"></NavBar>
            <Outlet className="dark:bg-gray-800 "></Outlet>
        </div>
    );
};

export default Root;