import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/mindScribble logo 3.png";
import logoFull from "../imgs/mindScribble logo 3.png";  // with "MindScribble" text
import logoMobile from "../imgs/mindScribble logo smallscreen.png";  // mobile version
import blogPost from "../imgs/blog write.png"

const Navbar = () => {
// state function for hiding and showing search bar when screen size increases and just the search icon when screen decreases.
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

    return (
        <>
        <nav className="navbar pl-[10px] pr-[5px] h-[100px]">
            <Link to="/" className="flex-none w-[200px] md:w-[200px] max-sm:w-[200px]">  {/* changed from flex-non w-10*/}
{/* logo */}
                <img src={logoFull} alt="MindScribble" className="pt-[5px] w-[200px] h-[120px] md:w-[200px] md:h-[100px] hidden sm:block w-[200px] h-[70px] object-contain" /> {/* changed from w-full*/}
                <img src={logoMobile} alt="MindScribble icon" className="block sm:hidden w-[150px] h-[70px] object-contain"
  />
            </Link>
{/* Search bar show and hidden */}
            <div
                className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${searchBoxVisibility ? 'show' : 'hide'}`}
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                />
{/* Search icon */}
                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
            </div>
{/* Search button */}
            <div className="flex items-center gap-3 md:gap-6 ml-auto">
                <button
                    className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                    onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
                >
                    <i className="fi fi-rr-search text-xl"></i>
                </button>

                <Link to="/editor" className="hidden md:flex items-center gap-0 link">
                    <img src={blogPost} className=" w-10 h-10 object-contain"/>
                    <span className="self-center">Write</span>
                </Link>
                <div className="flex flex-wrap gap-1 justify-center items-center w-full px-4">
                <Link className="btn-dark bg-mypurple py-2 text-sm" to={"/signin"}>
                Sign In
                </Link>
                <Link className="btn-light bg-lightpurple py-2 text-sm !text-gray-900 hover:!text-black hidden md:block" to={"/signup"}>
                Sign Up
                </Link>
                </div>


            </div>
        </nav>
        <Outlet />
        </>
    );
};

export default Navbar;

