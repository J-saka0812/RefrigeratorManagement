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
import styles from "./styles/Login.module.css";

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
          const { icon, ...userToNavigate } = user;
          navigate(ROUTES.HOME, { state: { user: userToNavigate } });
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
  const handleResetPassword = (event) => {
    event.preventDefault();
    if (!isSubmittable) return; // 送信不可なら何もしない
    // このデモではUIを閉じるのみ
    setViewState((prev) => ({ ...prev, showForgotPassword: true }));
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
    <div className={styles.loginContainer}>
      {/* パスワード忘れのポップアップ */}
      {viewState.showForgotPassword && (
        <div className={styles.forgotPasswordOverlay}>
          <div className={styles.forgotPasswordContent}>
            {/* リセット画面用オーバーレイ表示 */}
            {(viewState.status === "loading" ||
              viewState.status === "success" ||
              viewState.status === "error") && (
              <div className={styles.statusOverlay}>
                <MessageField
                  icon={
                    viewState.status === "success"
                      ? "✅"
                      : viewState.status === "error"
                      ? "❌"
                      : "⏳"
                  }
                  id="statusMessage"
                  className={`${styles.statusMessage} ${
                    viewState.status === "success"
                      ? styles.statusSuccess
                      : viewState.status === "error"
                      ? styles.statusError
                      : styles.statusLoading
                  }`}
                >
                  {viewState.message}
                </MessageField>
              </div>
            )}

            <LoginHeader title="パスワードをリセット" icon="🔑" />
            <form onSubmit={handleResetPassword} className={styles.form}>
              <InputField
                type="email"
                name="email"
                labelText="メールアドレス"
                className={`${styles.inputField} ${styles.inputFieldOrange}`}
                placeholder="example@email.com"
                icon="📩"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
              <InputField
                type={viewState.isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                labelText="新しいパスワード"
                className={`${styles.inputField} ${styles.inputFieldOrange}`}
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
                  <p className={styles.errorMessage}>{errors.password}</p>
                )}
              </InputField>

              <InputField
                type={viewState.isPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                labelText="新しいパスワード（確認）"
                className={`${styles.inputField} ${styles.inputFieldOrange}`}
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
                  <p className={styles.errorMessage}>
                    {errors.confirmPassword}
                  </p>
                )}
              </InputField>
              <div className={styles.buttonGroup}>
                {errors.general && (
                  <p className={styles.generalErrorMessage}>
                    {errors.general}
                  </p>
                )}
                <FunctionButton
                  type="button"
                  className={styles.cancelButton}
                  onClick={() =>
                    setViewState({ ...viewState, showForgotPassword: false })
                  }
                >
                  キャンセル
                </FunctionButton>
                <FunctionButton
                  type="submit"
                  className={styles.submitButton}
                >
                  送信
                </FunctionButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* デフォルトのログイン画面 */}
      <div className={styles.demoInfoContainer}>
        <div className={styles.demoInfoContent}>
          <div className={styles.demoInfoHeader}>🔍 デモ用ログイン情報</div>
          {mockUserData.map((userData) => (
            <DemoInfo key={userData.userId} userData={userData} />
          ))}
        </div>
      </div>

      <div className={styles.loginFormContainer}>
        <LoginHeader
          title="冷蔵庫管理"
          icon="🥬"
          description="アカウントにログインしてください"
        />

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div>
            <InputField
              type="email"
              id="email"
              name="email"
              labelText="メールアドレス"
              className={`${styles.inputField} ${styles.inputFieldGreen}`}
              icon="📩"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          <div>
            <InputField
              type={viewState.isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              labelText="パスワード"
              className={`${styles.inputField} ${styles.inputFieldGreen}`}
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
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className={styles.generalErrorMessage}>{errors.general}</p>
          )}

          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                handleForgotPassword();
              }}
              className={styles.forgotPasswordLink}
            >
              パスワードを忘れた場合
            </button>
          </div>

          <div className={styles.loginButtonContainer}>
            <FunctionButton
              type="submit"
              disabled={!isSubmittable}
              className={styles.loginButton}
            >
              🔐 ログイン
            </FunctionButton>
          </div>
        </form>

        <div className={styles.dividerContainer}>
          <div className={styles.divider}></div>
          <span className={styles.dividerText}>または</span>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.registerContainer}>
          <p className={styles.registerText}>まだアカウントをお持ちでない方</p>

          <div className={styles.registerButtonContainer}>
            <FunctionButton
              onClick={() => navigate(ROUTES.REGISTER)}
              className={styles.registerButton}
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
        <div className={styles.statusOverlay}>
          <MessageField
            icon={
              viewState.status === "success"
                ? "✅"
                : viewState.status === "error"
                ? "❌"
                : "⏳"
            }
            id="statusMessage"
            className={`${styles.statusMessage} ${
              viewState.status === "success"
                ? styles.statusSuccess
                : viewState.status === "error"
                ? styles.statusError
                : styles.statusLoading
            }`}
          >
            {viewState.message}
          </MessageField>
        </div>
      )}
    </div>
  );
}
