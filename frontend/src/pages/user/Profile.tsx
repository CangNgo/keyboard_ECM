import React from "react";
interface Props {
  title?: string;
}

function Profile({ title = "Default Title" }: Props) {
  return <>trang cá nhân</>;
}

export default Profile;