# Создаёт ярлык «Big Apple» с иконкой-яблоком на рабочем столе Windows.
# Запуск: правой кнопкой по файлу → «Выполнить с помощью PowerShell».
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $here
$desktop = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
$lnk = $shell.CreateShortcut((Join-Path $desktop 'Big Apple.lnk'))
$lnk.TargetPath = Join-Path $here 'Big Apple.bat'
$lnk.WorkingDirectory = $root
$lnk.IconLocation = (Join-Path $root 'public\favicon.ico') + ',0'
$lnk.WindowStyle = 7
$lnk.Description = 'Big Apple — американский английский'
$lnk.Save()
Write-Host 'Готово! На рабочем столе появился ярлык Big Apple.'
Start-Sleep -Seconds 2
