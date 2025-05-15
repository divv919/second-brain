import { Button } from "../components/ui/Button";
import { BrainIcon } from "../icons/BrainIcon";
import { ShareIcon } from "../icons/ShareIcon";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-24 font-poppins">
      <nav className="w-full px-21 py-6 bg-blue-100 flex justify-between items-center ">
        <h2 className="font-bold p-0 m-0 text-2xl text-blue-600 flex gap-2 cursor-pointer tracking-tighter">
          <BrainIcon size="lg" />
          Second Brain
        </h2>
        <Button text="Login" variant="primary" size="md" />
      </nav>
      <div className="flex flex-col gap-6 items-center ">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-6xl font-bold tracking-tighter ">
            Your
            <span className="text-blue-600 "> Second Brain</span> for the Web
          </div>
          <div className="text-2xl ">
            Save, organize and keep all your content links in one place.
          </div>
        </div>
        <Button text="Get Started" variant="primary" size="lg" />
      </div>
      <div className="px-16">
        <div className="grid grid-cols-3  gap-16">
          <div className="p-6 bg-blue-50 rounded-2xl w-full aspect-square flex flex-col items-center gap-6">
            <h1 className="text-3xl text-blue-600 font-semibold tracking-tight">
              Save Anything
            </h1>
            <img
              className="aspect-16/9 w-full rounded-2xl"
              src={`https://picsum.photos/id/${
                Math.floor(Math.random() * 500) + 1
              }/800/450`}
            />
            <h6 className="text-lg tracking-tight text-center text-gray-600 ">
              Store your articles, tweets, youtube video links all in one place
            </h6>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl w-full aspect-square flex flex-col items-center gap-6">
            <h1 className="text-3xl text-blue-600 font-semibold tracking-tight">
              Organize
            </h1>
            <img
              className="aspect-16/9 w-full rounded-2xl"
              src={`https://picsum.photos/id/${
                Math.floor(Math.random() * 500) + 1
              }/800/450`}
            />
            <h6 className="text-lg tracking-tight text-center text-gray-600 ">
              Relevant tags in your content links helps categorizing them,
              preventing the hassle of manual searching
            </h6>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl w-full aspect-square flex flex-col items-center gap-6">
            <h1 className="text-3xl text-blue-600 font-semibold tracking-tight">
              Rich Previews
            </h1>
            <img
              className="aspect-16/9 w-full rounded-2xl"
              src={`https://picsum.photos/id/${
                Math.floor(Math.random() * 500) + 1
              }/800/450`}
            />
            <h6 className="text-lg tracking-tight text-center text-gray-600 ">
              See beautiful previews of your content link fetched by our smart
              previewer
            </h6>
          </div>
        </div>
      </div>
      <footer className="p-3 h-50">
        <div className="bg-blue-800 h-full w-full rounded-2xl flex justify-center text-blue-50 items-center">
          © 2025 Second Brain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
