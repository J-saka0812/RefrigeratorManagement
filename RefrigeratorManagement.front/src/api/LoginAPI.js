import { ROUTES } from "const";


  // API関数
  export const UserLogin = async (event) => {
    event.preventDefault();
    setError("");
    setErrors([]);
// TODO: コンポーネント側とAPI側で処理を分離
// Claud参照
    if (userPassword !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    if (!isValidate) {
      setError("要件を満たしていません");
      return;
    }

    if (isValidate)
      try {
        const res = await fetch("api/stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          //  Cookie をやり取りする場合は必須
          credentials: "include",
          body: JSON.stringify({
            email: userMail,
            password: userPassword,
          }),
        });

        if (!res.ok) {
          throw new Error("メールアドレスまたはパスワードが正しくありません");
        }
        const data = await res.json();
        setLoginMessage("ログイン中‥");
        console.log("サーバーレスポンス:", data);
        setFieldMessage("ログイン中‥");
        setSuccessLogin(true);
        setIsMessageVisible(true);
        const timer = setTimeout(() => {
          navigate(ROUTES.HOME, {
            state: data,
          });
        }, 1500);

        return () => clearTimeout(timer);
        //  トークンは JS から見えない
        // → サーバーから Set-Cookie された Cookie がブラウザに保存される
        // → 以降の fetch でも credentials: "include" を指定すると自動送信される
      } catch (error) {
        const timer = setTimeout(() => {
          console.error(error);
          setFieldMessage("ログイン認証に失敗しました");
          setIsMessageVisible(true);
        }, 1500);
        setUserMail("");
        setUserPassword("");
        return () => clearTimeout(timer);
      }
  };

  // パスワード再設定
  export const handleResetPassword = async (event) => {
    event.preventDefault();
    setError("");
    setErrors([]);

    if (userPassword !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    if (!isValidate) {
      setError("要件を満たしていません");
      return;
    }
    // const formData = new FormData(event.target);
    // const email = formData.get("email");

    try {
      const res = await fetch("api/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //  Cookie をやり取りする場合は必須
        credentials: "include",
        body: JSON.stringify({password: newPassword}),
      });

      if (!res.ok) {
        throw new Error("メールアドレスまたはパスワードが正しくありません");
      }
    } catch (err) {
      console.error(err);
    }
  };


  
  // useEffect(() => {
  // データベースからの数量取得
  // fetch('api/userData')
  // .then(res => re.json())
  // .then(data => setUser(user));
  // },[])