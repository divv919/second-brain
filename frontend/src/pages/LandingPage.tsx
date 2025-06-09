import { Button } from "../components/ui/Button";
import { BrainIcon } from "../icons/BrainIcon";
import { Link } from "react-router-dom";
// import "dotenv/config";
const LandingPage = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-12  ">
      <nav className="w-full p-4 md:px-21 md:py-6 bg-blue-100 flex justify-between items-center ">
        <h2 className="font-bold p-0 m-0 text-md md:text-2xl text-blue-600 flex items-center gap-1 md:gap-2 cursor-pointer tracking-tighter">
          <BrainIcon />
          Second Brain
        </h2>
        <Link to="/auth">
          <Button text="Login" variant="primary" />
        </Link>
      </nav>

      <div className="flex flex-col gap-2 md:gap-6 items-center ">
        <div className="p-2 flex flex-col gap-2 items-center">
          <div className="text-4xl text-center font-extrabold tracking-tighter  md:text-5xl ">
            Your
            <span className="text-blue-600 "> Second Brain</span> for the Web
          </div>
          <div className="text-md text-center md:text-lg w-80 lg:w-full">
            Save, organize and keep all your content links in one place.
          </div>
        </div>
        <Link to="/auth">
          <Button text="Get Started" variant="primary" />
        </Link>
      </div>

      <div className="px-8 md:px-10">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 ">
          <div className="p-6 py-8  bg-blue-50 rounded-2xl w-full  text-center md:text-start lg:text-center flex flex-col lg:flex-col md:flex-row  items-center md:items-start gap-6">
            <img
              className="aspect-16/9 w-full md:w-1/2 lg:w-full rounded-2xl"
              src={`https://picsum.photos/id/${
                Math.floor(Math.random() * 500) + 1
              }/800/450`}
            />
            <div className="flex flex-col md:gap-4">
              <h1 className="text-lg  md:text-2xl text-blue-600 font-semibold tracking-tight">
                Save Anything
              </h1>

              <h6 className="text-sm md:text-md tracking-tight  text-gray-600 ">
                Store your articles, tweets, youtube video links all in one
                place
              </h6>
            </div>
          </div>

          <div className="p-6 py-8 text-center md:text-start lg:text-center bg-blue-50 rounded-2xl w-full  flex flex-col lg:flex-col md:flex-row items-center md:items-start gap-6">
            <img
              className="aspect-16/9 w-full md:w-1/2 lg:w-full rounded-2xl"
              src={`https://picsum.photos/id/${
                Math.floor(Math.random() * 500) + 1
              }/800/450`}
            />
            <div className="flex flex-col md:gap-4  ">
              <h1 className="text-lg  md:text-2xl text-blue-600 font-semibold tracking-tight">
                Organize
              </h1>

              <h6 className="text-sm md:text-md tracking-tight  text-gray-600 ">
                Relevant tags in your content links helps categorizing them,
                preventing the hassle of manual searching
              </h6>
            </div>
          </div>

          <div className="p-6 py-8 text-center md:text-start lg:text-center bg-blue-50 rounded-2xl w-full  flex flex-col lg:flex-col md:flex-row items-center md:items-start gap-6">
            <img
              className="aspect-16/9 w-full md:w-1/2 lg:w-full rounded-2xl"
              src={`https://picsum.photos/id/${
                Math.floor(Math.random() * 500) + 1
              }/800/450`}
            />
            <div className="flex flex-col md:gap-4  ">
              <h1 className="text-lg  md:text-2xl text-blue-600 font-semibold tracking-tight">
                Rich Previews
              </h1>

              <h6 className="text-sm md:text-md tracking-tight  text-gray-600 ">
                See beautiful previews of your content link fetched by our smart
                previewer
              </h6>
            </div>
          </div>
        </div>
      </div>

      <footer className="p-2 md:p-3 ">
        <div className="text-sm md:text-md bg-blue-800 p-10 md:p-16 h-full w-full rounded-2xl flex justify-center text-blue-50 items-center">
          © 2025 Second Brain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
