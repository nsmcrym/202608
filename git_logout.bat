@echo off
chcp 65001 > NUL
echo =========================================
echo Git および VS Code ログイン情報の削除を開始します...
echo =========================================
echo.

:: 1. Windows資格情報マネージャーからGit関連を削除
echo [1/4] Windows資格情報を削除中...
cmdkey /delete:git:https://github.com >NUL 2>&1
cmdkey /delete:vscodegit:https://github.com >NUL 2>&1
for /f "tokens=1,2,* delims= " %%a in ('cmdkey /list ^| findstr /i "git:"') do (
    cmdkey /delete:%%c >NUL 2>&1
)

:: 2. Gitの設定を解除
echo [2/4] Gitの設定（認証ヘルパー・ユーザー名）を解除中...
git config --global --unset credential.helper >NUL 2>&1
git config --global --unset user.name >NUL 2>&1
git config --global --unset user.email >NUL 2>&1

:: 3. VS Codeを一旦終了させる（ファイルロック解除のため）
echo [3/4] VS Codeを終了させています...
taskkill /F /IM Code.exe >NUL 2>&1

:: VS Codeを完全に終了
taskkill /F /IM Code.exe >NUL 2>&1

:: 認証情報・ログインセッション関連フォルダを削除
rmdir /s /q "%APPDATA%\Code\User\globalStorage" >NUL 2>&1
rmdir /s /q "%LOCALAPPDATA%\Programs\Microsoft VS Code\resources\app" >NUL 2>&1


echo.
echo =========================================
echo  すべてのログイン情報の削除が完了しました！
echo =========================================
pause
