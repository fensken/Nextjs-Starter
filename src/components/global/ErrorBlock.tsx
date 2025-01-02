import { OctagonAlert } from "lucide-react";

const ErrorBlock = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex w-full items-center text-sm justify-center p-4 border border-rose-500 bg-rose-100 text-rose-700 rounded-md">
      <OctagonAlert className="h-5 w-5 min-w-5 text-rose-500 mr-3" />

      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorBlock;
