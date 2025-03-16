'use client';

import { fonts } from "@/app/fonts";
import Avatar, { ReactAvatarProps } from "react-avatar";

const CustomAvatar: React.FC<ReactAvatarProps> = (props) => {
  return (
    <Avatar
      color="#151928"
      fgColor="white"
      className={`${fonts.outfit.className} text-sm font-medium`}
      {...props}
    />
  )
}

export default CustomAvatar;