import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
export const AuthPage = () => {
  return (
    <div className="flex justify-center items-center gap-40  bg-[linear-gradient(330deg,_#2a09b8,_#3c94c2)] min-h-screen font-cal">
      <div className="w-fit h-100 font-semibold  flex flex-col justify-between text-surface ">
        <div className="text-8xl ">Personal Space</div>
        <div className="text-7xl ">To Organize</div>
        <div className="text-6xl">All Your</div>
        <div className="text-5xl">Links</div>
      </div>

      <div className="bg-white min-h-100 w-1/5 p-10 flex flex-col justify-between rounded-md font-barlow gap-4">
        <div className="text-center ">
          <div className="text-2xl font-semibold  ">Login</div>
          <div className="text-lg font-normal text-gray-500 my-2 ">
            Welcome to Second Brain
          </div>
        </div>
        <div className="text-lg">
          <Input label="Username" placeholder="Enter username" type="text" />
        </div>
        <div className="text-lg">
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
          />
        </div>
        <Button variant="primary" size="md" text="Log in" />
        <div className="text-center text-lg font-normal text-gray-500 ">
          Don't have an account?
          <div className="text-primary text-lg ">Sign up</div>
        </div>
      </div>
    </div>
  );
};
