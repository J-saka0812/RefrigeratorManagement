import { useEffect, useState } from "react";

export function Login() {
  const [isLoginView, setIsLoginView] = useState(true);

  const loginForm = () => {
    const handleLogin = (event) => {
        event.preventDefault();
    }
    // TODO: ログイン画面のHTML要素整理
    return (
      <div classNameName="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen flex items-center justify-center p-4">
        <div classNameName="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md p-8">
          {/* <!-- ヘッダー --> */}
          <div classNameName="text-center mb-8">
            <div classNameName="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span classNameName="text-4xl">🥬</span>
            </div>
            <h1 classNameName="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              冷蔵庫管理
            </h1>
            <p classNameName="text-gray-600">
              アカウントにログインしてください
            </p>
          </div>

          {/* <!-- ログインフォーム --> */}
          <form id="loginForm" onsubmit={handleLogin} classNameName="space-y-6">
            {/* <!-- メールアドレス --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 pl-12 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
                  placeholder="example@email.com"
                  required
                />
                <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
                  📧
                </span>
              </div>
            </div>

            {/* <!-- パスワード --> */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                パスワード <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
                  placeholder="パスワードを入力"
                  required
                />
                <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
                  🔒
                </span>
                <button
                  type="button"
                  onclick="togglePassword()"
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  id="togglePasswordBtn"
                >
                  👁️
                </button>
              </div>
            </div>

            {/* <!-- パスワードを忘れた場合 --> */}
            <div className="text-right">
              <a
                href="#"
                onclick="showForgotPassword()"
                className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                パスワードを忘れた場合
              </a>
            </div>

            {/* <!-- エラーメッセージ（非表示） --> */}
            <div
              id="errorMessage"
              className="hidden p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-800 rounded-xl shadow-lg"
            >
              <div className="flex items-center">
                <span className="mr-2">❌</span>
                <span id="errorText">
                  メールアドレスまたはパスワードが正しくありません
                </span>
              </div>
            </div>

            {/* <!-- 成功メッセージ（非表示） --> */}
            <div
              id="successMessage"
              className="hidden p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 text-green-800 rounded-xl shadow-lg"
            >
              <div className="flex items-center">
                <span className="mr-2">✅</span>
                <span>ログインしています...</span>
              </div>
            </div>

            {/* <!-- ログインボタン --> */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              id="loginBtn"
            >
              <span className="text-xl">🔐</span>
              <span>ログイン</span>
            </button>
          </form>

          {/* <!-- 区切り線 --> */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">または</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* <!-- アカウント作成リンク --> */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">まだアカウントをお持ちでない方</p>
            <button
              onclick="goToSignup()"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span className="text-xl">👤</span>
              <span>新規アカウント作成</span>
            </button>
          </div>

          {/* <!-- フッター --> */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © 2024 冷蔵庫管理アプリ. All rights reserved.
            </p>
          </div>
        </div>

        {/* <!-- パスワード忘れポップアップ --> */}
        <div
          id="forgotPasswordPopup"
          className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">🔑</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                パスワードをリセット
              </h2>
              <p className="text-sm text-gray-600">
                登録済みのメールアドレスにリセット用のリンクを送信します
              </p>
            </div>

            <form
              id="forgotPasswordForm"
              onsubmit={handleForgotPassword}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="resetEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="resetEmail"
                    name="resetEmail"
                    className="w-full px-4 py-3 pl-12 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 bg-white/80"
                    placeholder="example@email.com"
                    required
                  />
                  <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
                    📧
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onclick={closeForgotPassword}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const handleAddOn = () => {
    setIsLoginView(false);
  };

  return <div></div>;
}
