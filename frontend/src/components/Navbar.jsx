import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

// Burger Icon component
const BurgerIcon = ({ isScrolled }) => (
    <svg className={`w-8 h-8 md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
    </svg>
);


const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'Feedback', path: '/feedbacks' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {openSignIn} = useClerk()
    const {user, isLoaded, isSignedIn} = useUser()
    const role = user?.publicMetadata?.role;
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(location.pathname !== '/'){
            setIsScrolled(true)
            return;
        }else{
            setIsScrolled(false)
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // Function to close menu when a link is clicked or other action
    const handleMenuItemClick = (path) => {
        setIsMenuOpen(false); // Close menu
        navigate(path); // Navigate
    };

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <Link to='/'>
                <img src={assets.sanjhf} alt="logo" className={`h-20
                    ${isScrolled && "invert opacity-80"}`} />
            </Link>

            {/* Desktop Nav (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}
                {(role === 'owner' || role === 'admin') && (
                <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}
                onClick={()=> navigate('/owner')}>
                    Dashboard
                </button>
                )}
            </div>

            {/* Desktop Right (Search & User Button / Login) - hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
                <img
                    src={assets.searchIcon}
                    alt="search"
                    className={`h-7 transition-all duration-500 ${isScrolled ? 'invert' : ''}`}
                />

                {!isLoaded ? (
                    <span className="text-sm text-gray-500 animate-pulse">Loading...</span>
                ) : isSignedIn ? (
                    <div className="auth-buttons">
                     <SignedIn>
                    <UserButton afterSignOutUrl="/">
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="My Bookings"
                                labelIcon={<BookIcon />}
                                onClick={() => navigate('my-bookings')}
                            />

                            <UserButton.Action
                                label="My Profile" // This will be the text in the dropdown
                                labelIcon={<img src={assets.placeholderId} alt="Profile" />} // Replace with actual icon
                                onClick={() => navigate('/my-profile')} // <--- NEW LINK TO YOUR CUSTOM PROFILE PAGE
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                     </SignedIn>
                        <SignedOut>
                        {/* Your sign-in/sign-up buttons */}
                        <button onClick={() => navigate('/sign-in')}>Sign In</button>
                        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                        </SignedOut>
                    </div>
                ) : (
                    <button
                        onClick={openSignIn}
                        className="bg-black border border-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-300 hover:invert opacity-80 hover:border hover:border-black cursor-pointer"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Icons (UserButton and BurgerIcon) - ONLY VISIBLE ON MOBILE */}
            <div className="flex items-center gap-4 md:hidden"> {/* Added flex and gap for spacing */}
                {/* UserButton for mobile */}
                {!isLoaded ? (
                    <span className="text-sm text-gray-500 animate-pulse"></span> // Keep loading indicator minimal
                ) : isSignedIn ? (
                    <UserButton />
                ) : (
                    // Optionally show a login button here if not signed in, or rely on mobile menu
                    <button
                        onClick={openSignIn}
                        className={`text-sm ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                    >
                        Login
                    </button>
                )}

                {/* Mobile Menu Toggle (Burger Icon) */}
                <button onClick={() => setIsMenuOpen(true)}>
                    <BurgerIcon isScrolled={isScrolled} />
                </button>
            </div>


            {/* Mobile Menu (full screen overlay) */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Close Button */}
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className="h-6.5"/>
                </button>

                {/* Mobile Navigation Links */}
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => handleMenuItemClick(link.path)}>
                        {link.name}
                    </a>
                ))}

                {/* Mobile Dashboard Button */}
                {(role === 'owner' || role === 'admin') && (
                <button
                    className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
                    onClick={() => {
                        handleMenuItemClick('/owner');
                        }}>
                        Dashboard
                    </button>
                )}

                {/* My Bookings Link in Mobile Menu (separate from UserButton) */}
                {isSignedIn && (
                    <button
                        onClick={() => {
                            navigate('my-bookings');
                            setIsMenuOpen(false); // Close menu after navigating
                        }}
                        className="flex items-center gap-2 text-gray-800 hover:underline"
                    >
                        <BookIcon className="text-gray-800" /> My Bookings
                    </button>
                )}

                {/* Mobile Login Button (if not signed in and UserButton not shown) */}
                {!isSignedIn && !isLoaded && ( // Only show if not loaded and not signed in
                    <button onClick={() => {openSignIn(); setIsMenuOpen(false);}}
                        className="bg-black border border-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-300 hover:border-white hover:bg-transparent cursor-pointer">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}
export default Navbar;