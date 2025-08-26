import { useEffect, useState } from "react";

export function Header() {
  const [user, setUser] = useState({
    userName: 0,
  });

  useEffect(() => {
    // データベースからの数量取得
    // fetch('api/userName')
    // .then(res => re.json())
    // .then(data => setStats(data));

    const dummyData = {
      userName: "田中太郎",
    };
    setUser(dummyData);
  }, []);

  return (
    <div>
      <header class="bg-white/95 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div class="max-w-4xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="bg-gradient-to-br from-green-400 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-2xl">🥬</span>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  冷蔵庫管理
                </h1>
                <p class="text-sm text-gray-600">{user.userName}さん</p>
              </div>
            </div>
            <button class="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              ログアウト
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
