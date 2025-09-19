import React from "react";

export function DemoInfo({ userData }) {
  return (
    <div className="m-2">
      <div>名前: {userData.userName} </div>
      <div>メール: {userData.email}</div>
      <div>パスワード: {userData.password}</div>
    </div>
  );
}
