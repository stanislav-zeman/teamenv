"use client";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { Box, Divider, Skeleton } from "@chakra-ui/react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { FC } from "react";

const ProfileContainer: FC<any> = () => {
  const { isLoaded, user } = useUser();
  if (!user || !isLoaded) return <Skeleton />;
  return (
    <main className="px-20 h-full overflow-hidden">
      <h1 className="my-4 text-2xl pl-2">Profile</h1>{" "}
      <Divider borderColor="gray.700" />
      <Box display="grid" gridTemplateColumns="20% 10% 70%" height="full" paddingTop="2rem">
        <ProfileAvatar name={user.username ?? ""} email={user.primaryEmailAddress?.emailAddress ?? ""} image={user.profileImageUrl} />
        <UserProfile
        appearance={{
          elements: {
            card: "w-full rounded-2xl bg-gray-200 shadow-lg overflow-hidden m-0",
            rootBox: "w-full h-5/6 max-h-[44em] col-start-3 pr-7",
            profileSection__activeDevices: "hidden",
            navbar: "hidden",
            profileSection__connectedAccounts: "hidden",
          },
          variables: {
            colorPrimary: "#01480f",
          }
        }}
      />
      </Box>
    </main>
  );
};

export default ProfileContainer;
