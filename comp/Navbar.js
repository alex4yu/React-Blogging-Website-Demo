import Link from "next/link";

//navbar header to navigate between pages
const Navbar = () => {
    return ( 
        <nav>
            <Link href="/">Home</Link>
            <Link href="/TodoList">Todo</Link>
            <Link href="/TodoApi">TodoApi</Link>
            <Link href="/ServerAccess">Sever Demo</Link>
            <Link href="/SignupForm">Sign Up</Link>
            <Link href="/Login">Log In</Link>
            <Link href="/PostsView">Posts</Link>
            
        </nav>
     );
}
 
export default Navbar;