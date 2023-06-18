"use client";
import { getRandomColor } from "@/utils/randomColor";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface UserAvatarProps {
  name: string;
  email: string;
  image: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ name, email, image }) => {
  console.log(image)
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 w-full rounded-2xl h-5/6 max-h-[44em] shadow-lg">
      <Box className=" absolute w-[20em] h-[20em] z-0"
        style={{
          background: "linear-gradient(45deg, #F1AB86 0%, #F7DBA7 100%)",
          borderRadius: "60% 40% 27% 73% / 24% 38% 62% 76%",
        }}
      />
      <div className="h-44 w-44 mb-4">
        <Avatar
          size="full"
          src={image}
          name={name}
          shadow="dark-lg"
        />
      </div>
      <Text zIndex="1" fontSize="5xl">
        {name}
      </Text>
      <Text zIndex="1" marginBottom="8em" fontSize="2xl">
        {email}
      </Text>
    </div>
  );
};

export default UserAvatar;
