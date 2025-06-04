import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BrainIcon } from "../icons/BrainIcon";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
export const AuthPage = () => {
  const [newUser, setNewUser] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!usernameRef.current || !passwordRef.current) {
      return { message: "Type valid input" };
    }
    if (newUser) {
      //signup
      const message = await signup(
        usernameRef.current.value,
        passwordRef.current.value
      );
      setNewUser(false);
      console.log(message);
    } else {
      //login
      const message = await login(
        usernameRef.current.value,
        passwordRef.current.value
      );
      navigate("/home/dashboard");
      console.log(message);
    }
  };

  return (
    <>
      {user && <Navigate to="/home/dashboard" />}

      <div className="p-4 flex flex-col min-h-screen justify-start items-center gap-8 lg:gap-16 font-poppins bg-gradient-to-r from-blue-500 to-blue-900">
        <nav className="text-2xl text-blue-300 py-6 font-extrabold tracking-tight flex gap-2 items-center">
          <BrainIcon /> Second Brain
        </nav>

        <div className="flex flex-col  items-center lg:items-start  lg:flex-row gap-2 lg:gap-20 text-blue-950">
          <div className="w-full tracking-tight font-bold flex-col flex text-3xl md:text-3xl lg:flex-col md:flex-row gap-1 md:gap-2 lg:gap-12 justify-between lg:pb-28 items-center lg:items-start text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300">
            <div className="lg:text-6xl xl:text-8xl">Personalized </div>
            <div className="lg:text-5xl xl:text-7xl">Space for</div>
            <div className="lg:text-4xl xl:text-6xl">all your</div>
            <div className="lg:text-3xl xl:text-5xl">Links</div>
          </div>
          <div className="flex m-12 lg:m-0 w-full flex-col gap-10 p-6 md:p-8 md:h-120 md:w-90 bg-blue-50 rounded-2xl">
            <div className=" text-center flex flex-col gap-1">
              <div className="font-semibold text-3xl">
                {newUser ? "Sign up" : "Login"}
              </div>
              <div className="text-md font-light">
                Welcome to <span className="text-blue-600">Second Brain</span>
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-4 ">
                <Input
                  ref={usernameRef}
                  label="Username"
                  placeholder="Enter username"
                />
                <Input
                  ref={passwordRef}
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <Button
                variant="primary"
                text={newUser ? "Sign up" : "Login"}
                onClick={handleSubmit}
              />
              <div className="text-md  text-center">
                <div>
                  {newUser
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </div>
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setNewUser((prev) => !prev)}
                >
                  {newUser ? "Login" : "Sign up"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
