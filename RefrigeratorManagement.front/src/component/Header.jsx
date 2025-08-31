import { useEffect, useState } from "react";
import { FunctionButton } from "./FunctionButton";
import { mockUserData } from "../data/MockUserData.jsx";

export function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // ログイン機能が実装されるまで、モックデータの最初のユーザーを表示
    const currentUser = mockUserData[0];
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  
  // useEffect(() => {                               
  // データベースからの数量取得                            
  // fetch('api/userData')                                 
  // .then(res => re.json())              
  // .then(data => setUser(user));
  // }

  return (
    <div>
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                {user.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {user.userName}さん
                </h1>
                <p className="text-sm text-gray-600">ID: {user.userId}</p>
              </div>
            </div>
            <FunctionButton type="button" onclick className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              ログアウト
            </FunctionButton>
          </div>
        </div>
      </header>
    </div>
  );
}