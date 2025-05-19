
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-task-black">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button 
        className="mt-8"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </div>
  );
}
