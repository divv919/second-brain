import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BrainIcon } from "../icons/BrainIcon";
export const AuthPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-start items-center gap-y-10 font-poppins bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="text-2xl text-blue-300 py-6 font-extrabold tracking-tight flex gap-2 items-center">
        <BrainIcon size="lg" /> Second Brain
      </div>

      <div className="flex gap-24 text-blue-950">
        <div className="tracking-tight font-bold flex flex-col justify-between pb-8 text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300">
          <div>Personalized </div>
          <div className="text-7xl">Space for</div>
          <div className="text-6xl">all your</div>
          <div className="text-5xl">Links</div>
        </div>
        <div className="flex flex-col gap-10 p-8 h-120 w-90 bg-blue-50 rounded-2xl">
          <div className=" text-center flex flex-col gap-1">
            <div className="font-semibold text-3xl">Login</div>
            <div className="text-md font-light">
              Welcome to <span className="text-blue-600">Second Brain</span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Input label="Username" placeholder="Enter username" />
              <Input label="Password" placeholder="Enter password" />
            </div>
            <Button size="md" variant="primary" text="Login" />
            <div className="text-md  text-center">
              <div>Don't have an account?</div>
              <div className="text-blue-600 cursor-pointer">Sign up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// <div className="flex justify-center items-center gap-40  bg-[linear-gradient(330deg,_#2a09b8,_#3c94c2)] min-h-screen font-cal">
//       <div className="w-fit h-100 font-semibold  flex flex-col justify-between text-surface ">
//         <div className="text-8xl ">Personal Space</div>
//         <div className="text-7xl ">To Organize</div>
//         <div className="text-6xl">All Your</div>
//         <div className="text-5xl">Links</div>
//       </div>

//       <div className="bg-white min-h-100 w-1/5 p-10 flex flex-col justify-between rounded-md font-barlow gap-4">
//         <div className="text-center ">
//           <div className="text-2xl font-semibold  ">Login</div>
//           <div className="text-lg font-normal text-gray-500 my-2 ">
//             Welcome to Second Brain
//           </div>
//         </div>
//         <div className="text-lg">
//           <Input label="Username" placeholder="Enter username" type="text" />
//         </div>
//         <div className="text-lg">
//           <Input
//             label="Password"
//             placeholder="Enter password"
//             type="password"
//           />
//         </div>
//         <Button variant="primary" size="md" text="Log in" />
//         <div className="text-center text-lg font-normal text-gray-500 ">
//           Don't have an account?
//           <div className="text-primary text-lg ">Sign up</div>
//         </div>
//       </div>
//     </div>
