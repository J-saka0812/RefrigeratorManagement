import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionButton } from "component/FunctionButton";
import { InputField } from "component/InputField";
import { LoginHeader } from "component/LoginHeader";
import { LoginFooter } from "component/LoginFooter";
import { MessageField } from "component/MessageField";
import { mockUserData } from "../data/MockUserData";
import { ROUTES } from "../const";
import { DemoInfo } from "component/DemoInfo";
import { ToggleButton } from "component/ToggleButton";

export function Login() {
  const navigate = useNavigate();

  // =========== Stateの整理 ===========
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // バリデーションエラーをフィールドごとに管理
  const [errors, setErrors] = useState({});
  // フォームが送信可能かどうかの状態
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [viewState, setViewState] = useState({
    showForgotPassword: false,
    isPasswordVisible: false,
    status: "idle", // 'idle', 'loading', 'success', 'error'
    message: "",
    isResetPassword: false,
  });

  // =========== バリデーションロジック ===========
  const validate = (name, value, currentFormData) => {
    let newErrors = { ...errors };

    switch (name) {
      case "username":
        if (!value) newErrors.username = "ユーザー名を入力してください";
        else delete newErrors.username;
        break;
      case "email":
        if (!value) newErrors.email = "メールアドレスを入力してください";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          newErrors.email = "正しいメールアドレス形式で入力してください";
        } else delete newErrors.email;
        break;
      case "password":
        if (!value) newErrors.password = "パスワードを入力してください";
        else if (value.length < 6)
          newErrors.password = "6文字以上で入力してください";
        else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
          newErrors.password = "英字と数字を両方含めてください";
        } else delete newErrors.password;
        // パスワード確認欄も再評価
        if (
          currentFormData.confirmPassword &&
          value !== currentFormData.confirmPassword
        ) {
          newErrors.confirmPassword = "パスワードが一致しません";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (!value)
          newErrors.confirmPassword = "パスワードを再入力してください";
        else if (currentFormData.password !== value) {
          newErrors.confirmPassword = "パスワードが一致しません";
        } else delete newErrors.confirmPassword;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // ログインフォームの送信可否をチェックするuseEffect
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;

    // 表示されているフォームに応じて、チェックするフィールドを切り替える
    const fieldsToValidate = viewState.showForgotPassword
      ? ["email", "password", "confirmPassword"]
      : ["email", "password"];

    const hasEmptyFields = fieldsToValidate.some((field) => !formData[field]);

    setIsSubmittable(!hasErrors && !hasEmptyFields);
  }, [formData, errors, viewState.showForgotPassword]);

  // =========== イベントハンドラ ===========

  /**
   * フォームの入力値をまとめて処理する関数
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // setFormDataのコールバック関数を使うことで、
    // 更新が完了した直後の最新のstateにアクセスできる
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // 更新後のデータを使ってバリデーションを実行
      validate(name, value, updatedFormData);

      return updatedFormData;
    });
  };

  /**
   * パスワードの表示/非表示を切り替える関数
   */
  const togglePasswordVisibility = () => {
    setViewState((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));
  };

  /**
   * ログイン処理
   */
  const handleLogin = (event) => {
    event.preventDefault();

    // 1. ログイン処理開始 & ローディング表示
    setViewState((prev) => ({
      ...prev,
      status: "loading",
      message: "ログイン中...",
    }));

    // 2. 認証処理（1秒後に実行）
    setTimeout(() => {
      const user = mockUserData.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        // 3. ログイン成功時の処理
        setViewState((prev) => ({
          ...prev,
          status: "success",
          message: "ログイン成功！",
        }));

        // 1.5秒後にホームへ遷移
        setTimeout(() => {
          const mockUser = {
            email: user.email,
            name: user.userName,
            // 必要な基本データのみ抽出（Reactコンポーネントや関数は除外）
          };
          // TODO: ホームヘッダーにモックデータが表示されないので改善
          // const { icon, ...userToNavigate } = mockUserData;

          navigate(ROUTES.HOME, { state: { user: mockUser } });
        }, 1500);
      } else {
        // 4. 失敗時の処理
        setErrors({
          general: "メールアドレスまたはパスワードが正しくありません。",
        });
        setViewState((prev) => ({
          ...prev,
          status: "error",
          message: "メールアドレスまたはパスワードが正しくありません。",
        }));

        // 2秒後にエラー表示を消す
        setTimeout(() => {
          setViewState((prev) => ({ ...prev, status: "idle", message: "" }));
        }, 1500);
      }
    }, 1000); // 1秒間ローディングを表示
  };

  // パスワードリセット画面を開く
  const handleForgotPassword = () => {
      // フォームの状態をここでリセットしてから、ポップアップを開く
    setErrors({});
    setFormData({
      email: "", // もしメアドを引き継ぎたいなら、この行は削除
      password: "",
      confirmPassword: "",
    });
    setIsSubmittable(false);
    setViewState((prev) => ({
      ...prev,
      isPasswordVisible: false,
      status: "idle",
      message: "",
      showForgotPassword: true, // 最後にポップアップを開く
    }));
  };

  /**
   * パスワードリセット処理（UIのみ）
   */
  // TODO: 変更処理がちょっとおかしい
  const handleResetPassword = (event) => {
    event.preventDefault();
    if (!isSubmittable) return; // 送信不可なら何もしない
    // このデモではUIを閉じるのみ
    setViewState((prev) => ({...prev, showForgotPassword: true}));
    setViewState((prev) => ({
      ...prev,
      status: "loading",
      message: "パスワードリセット中...",
    }));

    // 2. 認証処理（1秒後に実行）
    setTimeout(() => {
      if (formData.confirmPassword === formData.password) {
        console.log("Password reset for:", formData.email);
        setViewState((prev) => ({
          ...prev,
          status: "success",
          message: "パスワードを変更しました",
        })); //成功メッセージの表示
        // 1.5秒後にパスワードリセットポップを閉じる
        setTimeout(() => {
          setViewState((prev) => ({
            ...prev,
            showForgotPassword: false, // ポップアップを閉じる
            status: "idle", // statusを通常に戻す
            message: "", // メッセージをクリア
          }));
        }, 1500);
      } else {
        setErrors({
          general: "メールアドレスまたはパスワードが正しくありません。",
        });
        setViewState((prev) => ({
          ...prev,
          status: "error",
          message: "メールアドレスまたはパスワードが正しくありません。",
        }));

        // 2秒後にエラー表示を消す
        setTimeout(() => {
          setViewState((prev) => ({
            ...prev,
            showForgotPassword: false, // ポップアップを閉じる
            status: "idle",
            message: "",
          }));
        }, 1500);
      }
    }, 1000); // 1秒間ローディングを表示
  };

  return (
    <div className="relative bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 min-h-screen flex flex-col items-center justify-center p-4">
      
      {/* パスワード忘れのポップアップ */}
      {viewState.showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 w-full max-w-md p-6">

          {/* リセット画面用オーバーレイ表示 */}
          {(viewState.status === "loading" ||
            viewState.status === "success" ||
            viewState.status === "error") && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <MessageField
                icon={
                  viewState.status === "success"
                    ? "✅"
                    : viewState.status === "error"
                    ? "❌"
                    : "⏳"
                }
                id="statusMessage"
                className={`p-6 border-2 rounded-xl shadow-lg ${
                  viewState.status === "success"
                    ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-800"
                    : viewState.status === "error"
                    ? "bg-gradient-to-r from-orange-100 to-orange-100 border-orange-300 text-orange-800"
                    : "bg-gradient-to-r from-gray-100 to-gray-100 border-gray-300 text-gray-800"
                }`}
              >
                {viewState.message}
              </MessageField>
            </div>
          )}

            <LoginHeader title="パスワードをリセット" icon="🔑" />
            <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
              <InputField
                type="email"
                name="email"
                labelText="メールアドレス"
                className="w-full px-4 py-3 pl-12 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 bg-white/80"
                placeholder="example@email.com"
                icon="📩"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
              <InputField
                type={viewState.isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                labelText="新しいパスワード"
                className="w-full px-4 py-3 pl-12 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 bg-white/80"
                placeholder="新しいパスワード"
                icon="🔒"
                value={formData.password}
                onChange={handleInputChange}
              >
                <ToggleButton
                  onClick={() => {
                    togglePasswordVisibility();
                  }}
                  viewState={viewState.isPasswordVisible}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </InputField>

              <InputField
                type={viewState.isPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                labelText="新しいパスワード（確認）"
                className="w-full px-4 py-3 pl-12 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-200 bg-white/80"
                placeholder="もう一度入力してください"
                icon="🔒"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              >
                <ToggleButton
                  onClick={() => {
                    togglePasswordVisibility();
                  }}
                  viewState={viewState.isPasswordVisible}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </InputField>
              <div className="flex space-x-3 pt-4">
                {errors.general && (
                  <p className="text-red-500 text-sm text-center">
                    {errors.general}
                  </p>
                )}
                <FunctionButton
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200"
                  onClick={() =>
                    setViewState({ ...viewState, showForgotPassword: false })
                  }
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
      )}

      {/* デフォルトのログイン画面 */}
      <div className="w-full max-w-md lg:absolute lg:top-4 lg:right-4 lg:w-auto mb-4 lg:mb-0 bg-blue-100 border-2 border-blue-300 text-blue-800 p-4 rounded-xl shadow-lg z-50">
        <div className="text-sm">
          <div className="font-semibold mb-2">🔍 デモ用ログイン情報</div>
          {mockUserData.map((userData) => (
            <DemoInfo key={userData.userId} userData={userData} />
          ))}
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md p-8">
        <LoginHeader
          title="冷蔵庫管理"
          icon="🥬"
          description="アカウントにログインしてください"
        />

        <form onSubmit={handleLogin} className="space-y-5 mt-6">
          <div>
            <InputField
              type="email"
              id="email"
              name="email"
              labelText="メールアドレス"
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
              icon="📩"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <InputField
              type={viewState.isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              labelText="パスワード"
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-200 bg-white/80"
              icon="🔒"
              placeholder="パスワードを入力"
              value={formData.password}
              onChange={handleInputChange}
            >
              <ToggleButton
                onClick={() => {
                  togglePasswordVisibility();
                }}
                viewState={viewState.isPasswordVisible}
              />
            </InputField>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          <div className="text-right">
            <button
              type="button"
              onClick={() =>{
                handleForgotPassword();
              }}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              パスワードを忘れた場合
            </button>
          </div>

          <div className="flex justify-center">
            <FunctionButton
              type="submit"
              disabled={!isSubmittable}
              className="w-[70%] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:from-gray-400 disabled:shadow-none"
            >
              🔐 ログイン
            </FunctionButton>
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">または</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-2">まだアカウントをお持ちでない方</p>

          <div className="flex justify-center">
            <FunctionButton
              onClick={() => navigate(ROUTES.REGISTER)}
              className="w-[70%] bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              👤 新規アカウント作成
            </FunctionButton>
          </div>
        </div>

        <LoginFooter />
      </div>

      {/* ログイン状態に応じたオーバーレイ表示 */}
      {(viewState.status === "loading" ||
        viewState.status === "success" ||
        viewState.status === "error") && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <MessageField
            icon={
              viewState.status === "success"
                ? "✅"
                : viewState.status === "error"
                ? "❌"
                : "⏳"
            }
            id="statusMessage"
            className={`p-6 border-2 rounded-xl shadow-lg ${
              viewState.status === "success"
                ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 text-green-800"
                : viewState.status === "error"
                ? "bg-gradient-to-r from-orange-100 to-orange-100 border-orange-300 text-orange-800"
                : "bg-gradient-to-r from-gray-100 to-gray-100 border-gray-300 text-gray-800"
            }`}
          >
            {viewState.message}
          </MessageField>
        </div>
      )}
    </div>
  );
}