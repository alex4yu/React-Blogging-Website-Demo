import Navbar from "./Navbar"
const Layout = ({children}) => {
    //layout for all pages which includes the navbar
    return ( 
        <div className="content">
            <Navbar/>
            {children}

        </div>
     );
}
 
export default Layout;