import { Link } from 'react-router-dom'
import logo from "../imgs/mindScribble logo 3.png"
import AnimationWrapper from '../common/page-animation'
import defaultBanner from "../imgs/blog banner.png"

const BlogEditor = () => {


    const handleBannerUpload = (e) => {
            console.log(e)
            let img = e.target.files[0]

            console.log(img)
    }
    // with console.log(e) we were able to expand the images details and find target and then File, we need to access this and send it to the server so that we can preview it. e.target.files will give an array of the latest uploaded file in the zero index and it will give us info so we can upload fiel to backend..


    return (
        <>
        <nav className="navbar pl-[10px] pr-[5px] pt-[22px] h-[100px]" > 
        {/* had to add pt-[22px] to logo as it wasn't in exact position as home page */}
        <Link to="/" className="flex-none w-[200px] md:w-[200px] max-sm:w-[200px] ">  {/* changed from flex-non w-10*/}
        {/* the navbar in css has flexbox still so we set the logo Link to flex-none so flex box won't be applied or affect the logo */}
            <img src={logo} />
        </Link>

        <p className="max-md:hidden purpleColor line-clamp-1 w-full">
            {/* line-clamp will add ... if text overflows */}
            New Blog
        </p>

        <div classNAme="flex gap-4 ml-auto ">
            <button className="btn-dark bg-mypurple py-2">
                Publish
            </button>
             <button className="btn-light bg-lightpurple py-2">
                Save Draft
            </button>
        </div>
        </nav>

        <AnimationWrapper> 
            {/* to add a fade in effect */}
        <section>
            <div classNAme="mx-auto max-w-[900px] w-full">
                {/* max-w-[900px] if we have a screen smaller than 900px it will cover the full width, larger then it will only cover 900px of the screen and will align itself in the center */}

                <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">
                    {/* aspect-video means 16:9 and so don't have to give it a height or width */}
                    <label htmlFor="uploadBanner">
                        <img 
                        src={defaultBanner}
                        className="z-20"
                        // so that the image will be infornt so we can click on it
                        />
                        <input 
                        id="uploadBanner"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleBannerUpload}
                        />
                        {/* this input gives a choose file button for user to add pictures (only png, jpg or jpeg files) if hidden is commented out and will work when you click on it it will open explorer. and if you click on the defaultBanner img which just says blog banner the explorer window should come up. onChange is to make it functional*/}
                    </label>
                </div>
            </div>
        </section>
        </AnimationWrapper>




        </> 
        // we wrap navbar in empty component so that we can add other components as in react you can only return a single parent component, that's why we wrap navbar and other conponents within <> </>
    )
}

export default BlogEditor