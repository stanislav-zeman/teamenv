import React from "react";
import {SignUp} from "@clerk/nextjs";

async function Page() {
  return (
    <div>
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  );
}

export default Page;
