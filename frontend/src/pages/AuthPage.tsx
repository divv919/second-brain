import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BrainIcon } from "../icons/BrainIcon";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { ShowEyeIcon } from "../icons/ShowEye";
import { HiddenEyeIcon } from "../icons/HiddenEye";
import { z } from "zod";
import { useToast } from "../hooks/useToast";
import GlobalLoader from "../components/ui/GlobalLoader";
// import Image from "../components/ui/Image";
const INPUT_SCHEMA = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must not exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const AuthPage = () => {
  const { enableSnackbar } = useToast();
  const [newUser, setNewUser] = useState(false);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isSignedUp, setIsSignedUp] = useState(false);
  const { login, signup, user, loading } = useAuth();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password: string[] | undefined;
    username: string[] | undefined;
  }>({
    password: undefined,
    username: undefined,
  });
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    if (passwordRef.current && usernameRef.current) {
      passwordRef.current.value = "";
      usernameRef.current.value = "";
    }
  }, [newUser]);

  const handleSubmit = async () => {
    try {
      setBtnLoading(true);
      const formData = {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      };
      const result = INPUT_SCHEMA.safeParse(formData);
      if (!result.success) {
        const { username, password } = result.error.flatten().fieldErrors;

        setErrors({ username, password });
        return;
      }
      setErrors({ username: undefined, password: undefined });
      if (!usernameRef.current || !passwordRef.current) {
        return;
      }
      if (newUser) {
        const response = await signup(
          usernameRef.current.value,
          passwordRef.current.value
        );
        if (response.status !== 200) {
          enableSnackbar(response.message, "error");
          return;
        }
        setNewUser(false);
        setIsSignedUp(true);
        enableSnackbar("Signup Successful", "success");
      } else {
        //login
        const response = await login(
          usernameRef.current.value,
          passwordRef.current.value
        );

        if (response.status !== 200) {
          enableSnackbar(response.message, "error");
          return;
        }

        navigate(
          window.location.search.match(/[?&]redirectTo=([^&]+)/)?.[1] ||
            "/home/dashboard"
        );
        enableSnackbar("Login Successful", "success");
      }
    } catch (err) {
      //put it on toast
      console.log(err);
      enableSnackbar("Internal Server error", "error");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <GlobalLoader />
      </div>
    );
  }
  return (
    <>
      {user ? (
        <Navigate to="/home/dashboard" />
      ) : (
        <div className="p-4 flex flex-col min-h-screen justify-start items-center gap-8 lg:gap-16  bg-gradient-to-r from-blue-500 to-blue-900">
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
            <div className="flex m-12 lg:m-0  flex-col gap-10 p-6 md:p-8 md:h-120 md:w-100 bg-blue-50 rounded-2xl">
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
                    errors={errors.username}
                  />
                  <Input
                    ref={passwordRef}
                    label="Password"
                    type={passwordShow ? "text" : "password"}
                    placeholder="Enter password"
                    sideButton={
                      <button
                        className="cursor-pointer"
                        onClick={() => setPasswordShow((curr) => !curr)}
                      >
                        {passwordShow ? <ShowEyeIcon /> : <HiddenEyeIcon />}
                      </button>
                    }
                    errors={errors.password}
                  />
                </div>
                <Button
                  variant="primary"
                  text={newUser ? "Sign up" : "Login"}
                  onClick={handleSubmit}
                  loading={btnLoading}
                />
                {!isSignedUp && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
