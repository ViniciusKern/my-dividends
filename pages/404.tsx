import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-teal-800 font-bold text-7xl">404</div>

      <div className="font-bold text-3xl">This page does not exist</div>

      <div className="text-gray-400 font-medium text-sm">
        The page you are looking for could not be found.
      </div>

      <Link
        className="text-teal-800 font-bold bg-teal-100 p-4 rounded-lg"
        href="/"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
