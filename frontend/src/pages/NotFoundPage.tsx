import NotFound from "../components/ui/NotFound";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
export const NotFoundPage = () => {
  return (
    <div className="min-h-screen p-10 bg-blue-50 flex flex-col items-center gap-6">
      <div className="w-1/3 min-w-80 max-w-200 aspect-4/3 ">
        <NotFound />
      </div>
      <div className="flex flex-col gap-6 items-center">
        <div className="text-xl">Page not found</div>
        <Link to="/home">
          <Button text="Home" variant="primary" />
        </Link>
      </div>
    </div>
  );
};
