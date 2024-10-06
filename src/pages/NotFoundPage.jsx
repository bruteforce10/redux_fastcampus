import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <p className="text-6xl font-semibold">Page Not Found</p>
      <Link to={"/"}>Go Back</Link>
    </div>
  );
};

export default NotFoundPage;
