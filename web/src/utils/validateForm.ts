type ReturnObject = {
  field: string,
  message: string
}

/**
 * 
 * @param email メールアドレス
 * @param password パスワード
 * @param mode 使用機能(login or create or register)
 * @returns ReturnObject or null
 */
export const validateForm = (email: string, password: string, mode: string): ReturnObject | null => {
  if (email == '') {
    return {
      field: 'email',
      message: 'emailが入力されていません'
    }
  };

  if (!email.includes('@')) {
    return {
      field: 'email',
      message: '無効なメールアドレスです'
    }
  };

  if (mode == 'login') {
    if (password == '') {
      return {
        field: 'password',
        message: 'passwordが入力されていません'
      }
    };
  };


  return null;
}