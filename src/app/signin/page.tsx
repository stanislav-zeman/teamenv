import React from "react";
import { SignIn } from "@clerk/nextjs";

async function Page() {
  return (
    <div className="h-100">
      <SignIn path="/signin" routing="path" signUpUrl="/signup" />
    </div>
  );
}

export default Page;
