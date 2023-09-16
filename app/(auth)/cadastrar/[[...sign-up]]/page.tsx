import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
      <SignUp />
    </div>
  );
}
