
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar';

const Root = () => {
    return (
        <div>
            <h1>Root</h1>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;