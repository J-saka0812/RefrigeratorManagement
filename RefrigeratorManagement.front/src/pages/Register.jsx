import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FunctionButton } from "component/FunctionButton";
import { InputField } from "component/InputField";
import { LoginHeader } from "component/LoginHeader";
import { MessageField } from "component/MessageField";
import { ROUTES } from "../const";
import styles from "./styles/Register.module.css";

export function Register() {
  const navigate = useNavigate();

  // フォームの入力値を管理
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // エラーメッセージをフィールドごとに管理
  const [errors, setErrors] = useState({});
  // 登録成功時のUI表示用
  const [isRegistered, setIsRegistered] = useState(false);
  // 送信ボタンの活性/非活性を管理
  const [isSubmittable, setIsSubmittable] = useState(false);

  /**
   * バリデーションロジック
   */
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
  // formDataやerrorsが変わるたびに送信可能かチェック
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields = Object.values(formData).some((val) => val === "");
    setIsSubmittable(!hasErrors && !hasEmptyFields);
  }, [formData, errors]);

  /**
   * フォーム入力値を更新し、バリデーションを実行
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    validate(name, value, newFormData);
  };

  /**
   * 新規登録処理
   */
  const handleRegister = (event) => {
    event.preventDefault();
    if (!isSubmittable) return; // 送信不可なら何もしない

    console.log("Registering with:", formData);
    setIsRegistered(true);

    // 2秒後にログインページへリダイレクト
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 2000);
  };

  return (
    <>
      <div
        className={`${styles.registerContainer} ${
          isRegistered ? styles.blurred : ""
        }`}>
        <div className={styles.registerContent}>
          <LoginHeader
            icon="🥬"
            title="新規アカウント作成"
            description="情報を入力してください"
          />

          <form onSubmit={handleRegister} className={styles.form}>
            <div>
              <InputField
                type="text"
                id="username"
                name="username"
                labelText="ユーザー名"
                className={styles.inputField}
                icon="✒️"
                placeholder="田中太郎"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className={styles.errorMessage}>{errors.username}</p>
              )}
            </div>
            <div>
              <InputField
                type="email"
                id="email"
                name="email"
                labelText="メールアドレス"
                className={styles.inputField}
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
                type="password"
                id="password"
                name="password"
                labelText="パスワード"
                className={styles.inputField}
                icon="🔒"
                placeholder="6文字以上・英数字の両方を使用"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password}</p>
              )}
            </div>
            <div>
              <InputField
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                labelText="パスワード確認"
                className={styles.inputField}
                icon="🔒"
                placeholder="パスワードを再入力"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className={styles.errorMessage}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className={styles.submitButtonContainer}>
              <FunctionButton
                type="submit"
                disabled={!isSubmittable}
                className={styles.submitButton}
              >
                アカウント作成
              </FunctionButton>
            </div>
          </form>

          <div className={styles.loginLinkContainer}>
            <p className={styles.loginLinkText}>
              すでにアカウントをお持ちですか？
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className={styles.loginLink}
              >
                ログイン
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* 登録成功時のオーバーレイ表示 */}
      {isRegistered && (
        <div className={styles.successOverlay}>
          <MessageField
            icon="✅"
            id="successMessage"
            className={styles.successMessage}
          >
            アカウントが正常に作成されました！ログインページに移動します...
          </MessageField>
        </div>
      )}
    </>
  );
}