import { FunctionButton } from "component/FunctionButton";
import { ROUTES } from "../const";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginHeader } from "component/loginHeader";
import { InputField } from "component/InputField";
import { LoginFooter } from "component/LoginFooter";
import { appleIcon } from "../../public/favicon.svg";
import { MessageField } from "component/MessageField";

export function Login() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [FieldMessage, setFieldMessage] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("ログイン");
  const [isVisible, setIsVisible] = useState(false);
// API処理用
  // const [loginValue, setLoginValue] = useState({
  //   mail: "",
  //   password: "",
  // });
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleGetName = (event) => {
    const userName = event.target.value;
    setUserName(userName);
  };
  const handleGetMail = (event) => {
    const mailAddress = event.target.value;
    setUserMail(mailAddress);
  };

  const handleGetPassword = (event) => {
    const password = event.target.value;
    setUserPassword(password);
  };

  // メール、パスワード入力ごとにstate変数変更
  useEffect(() => {
    const userLoginValue = {
      mail: userMail,
      password: userPassword,
    };
    setLoginValue(userLoginValue);
  }, [userMail, userPassword]);

  // 初回画面起動時動作
  useEffect(() => {
    setUserMail("");
    setUserPassword("");
  }, []);

  // パスワード表示/非表示切り替え
  const togglePassword = () => {
    if (inputRef.current) {
      inputRef.current.type = isVisible ? "password" : "text";
      setIsVisible(!isVisible);
    }
  };

  // ログイン成功か失敗のメッセージフィールド
  useEffect(() => {
    if (isMessageVisible && successLogin) {
      return (
        <MessageField
          id="successMessage"
          className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 text-green-800 rounded-xl shadow-lg"
          icon="✅"
        >
          {FieldMessage}
        </MessageField>
      );
    } else if (isMessageVisible && !successLogin) {
      return (
        <MessageField
          id="errorMessage"
          className="p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-800 rounded-xl shadow-lg"
          icon="❌"
        >
          {FieldMessage}
        </MessageField>
      );
    }
  }, [isMessageVisible]);

  // APIからのデータ取得
  const handleLogin = async (event) => {
    event.preventDefault();
      
        // try {
        //   const res = await fetch("api/stats", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     //  Cookie をやり取りする場合は必須
        //     credentials: "include",
        //     body: JSON.stringify(loginValue),
        //   });

        //   if (!res.ok) {
        //     throw new Error("メールアドレスまたはパスワードが正しくありません");
        //   }
        //   const data = await res.json();

      setTimeout(() => {
        
        if (userMail == "demo@example.com" && password == "password123") {
          setLoginMessage("ログイン中‥");
          console.log("サーバーレスポンス:", data);
          setFieldMessage("ログイン中‥");
          setSuccessLogin(true);
          setIsMessageVisible(true);
          navigate(ROUTES_HOME);
        } else {
            console.error(error);
            setFieldMessage("ログイン認証に失敗しました");
            setIsMessageVisible(true);
          setUserMail("");
          setUserPassword("");
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
      // TODO: API処理用
      // setLoginMessage("ログイン中‥");
      // console.log("サーバーレスポンス:", data);
      // setFieldMessage("ログイン中‥");
      // setSuccessLogin(true);
      // setIsMessageVisible(true);
      // const timer = setTimeout(() => {
      //   navigate(ROUTES.HOME, {
      //     state: data,
      //   });
      // }, 1500);

      // return () => clearTimeout(timer);
      //  トークンは JS から見えない
      // → サーバーから Set-Cookie された Cookie がブラウザに保存される
      // → 以降の fetch でも credentials: "include" を指定すると自動送信される
  //   } catch (error) {
  //     const timer = setTimeout(() => {
  //       console.error(error);
  //       setFieldMessage("ログイン認証に失敗しました");
  //       setIsMessageVisible(true);
  //     }, 1500);
  //     setUserMail("");
  //     setUserPassword("");
  //     return () => clearTimeout(timer);
  //   }
  // };

  // アカウント登録画面を表示
  const handleAddOn = (event) => {
    event.preventDefault();
    setIsLoginView(false);
  };

  //  パスワード忘れ画面を表示
  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  //  パスワード忘れ画面を閉じる
  const closeForgotPassword = () => {
    setShowForgotPassword(false);
  };

  // メールへ新しいパスワード送信
  const handleResetEmail = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("resetEmail");

    // 実際のアプリではパスワードリセットAPI呼び出し
    alert(`${email} にパスワードリセット用のリンクを送信しました。`);
    const timer = setTimeout(() => {
      closeForgotPassword();
    }, 1500);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (showForgotPassword) {
      return (
        <div
          id="forgotPasswordPopup"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 w-full max-w-md p-6">
            <LoginHeader
              title="パスワードをリセット"
              icon="🔑"
              description="登録済みのメールアドレスにリセット用のリンクを送信します"
            />
            <form
              id="forgotPasswordForm"
              onsubmit={handleResetEmail}
              className="space-y-4"
            >
              <InputField
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 pl-12 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 bg-white/80"
                placeholder="example@email.com"
                htmlFor="email"
                labelText="メールアドレス"
                icon="📩"
                value={userMail}
                onChange={handleGetMail}
              />

              <div className="flex space-x-3 pt-4">
                <FunctionButton
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
                  onClick={closeForgotPassword}
                >
                  キャンセル
                </FunctionButton>

                <FunctionButton
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  送信
                </FunctionButton>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }, [showForgotPassword]);

  if (isLoginView) {
    return (
      <div className="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md p-8">
          <LoginHeader
            title="冷蔵庫管理"
            icon={<appleIcon />}
            description="アカウントにログインしてください"
          />
          <form
            id="forgotPasswordForm"
            onsubmit={handleForgotPassword}
            className="space-y-4"
          ></form>
          <LoginHeader>アカウントにログインしてください</LoginHeader>
          <InputField
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 pl-12 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
            placeholder="example@email.com"
            htmlFor="email"
            labelText="メールアドレス"
            icon="📩"
            value={userMail}
            onChange={handleGetMail}
          />

          <InputField
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 pl-12 pr-12 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
            placeholder="6文字以上、英数字1文字以上使用してください"
            pattern="(?=.*[A-Za-z0-9]).{6,}"
            minlength="8"
            htmlFor="password"
            labelText="パスワード"
            icon="🔒"
            value={userPassword}
            onChange={handleGetPassword}
          >
            <button
              type="button"
              onclick={togglePassword}
              class="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              id="togglePasswordBtn"
            >
              {isVisible ? "🙈" : "👁️"}
            </button>
          </InputField>

          {/* <!-- パスワードを忘れた場合 --> */}
          <div class="text-right">
            <a
              href="#"
              onclick={handleShowForgotPassword}
              class="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
            >
              パスワードを忘れた場合
            </a>
          </div>

          {/* <!-- エラーメッセージ（非表示） --> */}
          <MessageField
            id="errorMessage"
            class="hidden p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-800 rounded-xl shadow-lg"
            icon="❌"
          >
            メールアドレスまたはパスワードが正しくありません
          </MessageField>

          {/* <!-- 成功メッセージ（非表示） --> */}
          <MessageField
            id="successMessage"
            class="hidden p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 text-green-800 rounded-xl shadow-lg"
            icon="✅"
          >
            ログインしています...
          </MessageField>

          {/* <!-- ログインボタン --> */}
          <FunctionButton
            type="submit"
            class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            id="loginBtn"
            onClick={handleLogin}
          >
            <span class="text-xl">🔐</span>
            <span>{loginMessage}</span>
          </FunctionButton>

          {/* <!-- 区切り線 --> */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">または</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* <!-- アカウント作成リンク --> */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">まだアカウントをお持ちでない方</p>

            <FunctionButton
              type="submit"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              id="loginBtn"
              onClick={handleAddOn}
            >
              <span class="text-xl">👤</span>
              <span>新規アカウント作成</span>
            </FunctionButton>

            {/* <!-- フッター --> */}
            <LoginFooter />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <body class="bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen">
        <div class="min-h-screen flex items-center justify-center p-4">
          <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
            {/* <!-- ヘッダー --> */}
            <div class="text-center mb-8">
              <div class="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-4xl">🥬</span>
              </div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                冷蔵庫管理アプリ
              </h1>
              <p class="text-gray-700 font-medium">新規アカウント作成</p>
            </div>

            {/* <!-- 登録フォーム --> */}
            <form id="registerForm" class="space-y-6">
              {/* <!-- ユーザー名 --> */}
                {/* TODO: ユーザーネームのインプットフィールド */}
                {/* TODO:パスワード確認用関数作成 */}
                
                <InputField
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
                placeholder="example@email.com"
                labelText="ユーザー名"
                icon="✒️"
                value={userName}
                onChange={handleGetName}
                />
              {/* <!-- メールアドレス --> */}
              <InputField
              type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
                placeholder="example@email.com"
                htmlFor="email"
                labelText="メールアドレス"
                icon="📩"
                value={userMail}
                onChange={handleGetMail}
                />

              {/* <!-- パスワード --> */}
              <InputField
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 pl-12 pr-12 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
            placeholder="6文字以上、英数字1文字以上使用してください"
            pattern="(?=.*[A-Za-z0-9]).{6,}"
            minlength="8"
            htmlFor="password"
            labelText="パスワード"
            icon="🔒"
            value={userPassword}
            onChange={handleGetMail}
          />

              {/* <!-- パスワード確認 --> */}
              <InputField
              type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
            placeholder="パスワードを再入力してください"
            pattern="(?=.*[A-Za-z0-9]).{6,}"
            minlength="8"
            htmlFor="password"
            labelText="パスワード確認"
            icon="🔒"
            value={userPassword}
            onChange={handleGetMail}
            />
              
              {/* <!-- 利用規約同意 --> */}
              <div class="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  class="mt-1 w-5 h-5 text-green-600 border-green-300 rounded-md focus:ring-green-400 focus:ring-2"
                  required
                />
                <label for="terms" class="text-sm text-gray-600">
                  <span class="text-green-600 hover:text-emerald-600 underline decoration-2 underline-offset-2 cursor-pointer font-medium">
                    利用規約
                  </span>
                  および
                  <span class="text-green-600 hover:text-emerald-600 underline decoration-2 underline-offset-2 cursor-pointer font-medium">
                    プライバシーポリシー
                  </span>
                  に同意します
                </label>
              </div>

              {/* <!-- 登録ボタン --> */}
              <FunctionButton
              type="submit"
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  アカウント作成
                </FunctionButton>
            </form>

            {/* <!-- ログインリンク --> */}
            <div class="mt-6 text-center">
              <p class="text-gray-600">
                すでにアカウントをお持ちですか？
                <a
                  href="#"
                  class="text-green-600 hover:text-emerald-600 font-semibold underline decoration-2 underline-offset-2"
                >
                  ログイン
                </a>
              </p>
            </div>

            {/* <!-- 成功メッセージ（非表示） --> */}
            <MessageField
            id="successMassage"
            className="mt-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 text-green-800 rounded-xl shadow-lg"
            icon="✅"
            >
            アカウントが正常に作成されました！
            </MessageField>
          </div>
        </div>
      </body>
    );
  }
}
