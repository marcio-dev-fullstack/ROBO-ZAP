# Run this script in PowerShell as a developer to prepare and start the app on Windows.
param()

Write-Output "1) Verificando dependências e instalando pacotes necessários"
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Warning "npm não encontrado na PATH. Instale Node.js antes de prosseguir."
  exit 1
}

if (!(Get-Command py -ErrorAction SilentlyContinue)) {
  Write-Warning "py não encontrado na PATH. Instale Python 3.11 antes de prosseguir."
  exit 1
}

npm install
py -3.11 -m pip install --upgrade pip
py -3.11 -m pip install -r requirements.txt

Write-Output "2) Garantindo que o diretório global do npm esteja no PATH da sessão"
$npmBin = & npm bin -g 2>$null
if (-not $npmBin) {
  $npmRoot = & npm root -g 2>$null
  if ($npmRoot) { $npmBin = Join-Path (Split-Path $npmRoot -Parent) 'bin' }
}
if ($npmBin -and ($env:Path -notlike "*${npmBin}*")) {
  Write-Output "Adicionando '$npmBin' ao PATH da sessão atual"
  $env:Path = $env:Path + ";" + $npmBin
}

Write-Output "3) Instalando PM2 (global) se não existir"
if (!(Get-Command pm2 -ErrorAction SilentlyContinue)) {
  npm install -g pm2
  Start-Sleep -Seconds 2
}

Write-Output "4) Tentando adicionar npm global ao PATH do usuário (persistente)"
try {
  if ($npmBin) {
    $userPath = [Environment]::GetEnvironmentVariable('Path','User')
    if ($userPath -notlike "*${npmBin}*") {
      [Environment]::SetEnvironmentVariable('Path', $userPath + ';' + $npmBin, 'User')
      Write-Output "Adicionado $npmBin ao Path do usuário. Reabra o PowerShell para que as alterações tenham efeito." 
    }
  }
} catch {
  Write-Warning "Não foi possível atualizar o PATH do usuário: $_"
}

Write-Output "5) Iniciando processos com PM2 (usando arquivo de configuração disponível)"
if (Test-Path .\ecosystem.config.windows.json) {
  pm2 start ecosystem.config.windows.json
} elseif (Test-Path .\ecosystem.config.js) {
  pm2 start ecosystem.config.js
} else {
  Write-Warning "Arquivo de configuração do PM2 não encontrado. Iniciando via scripts npm..."
  pm2 start npm --name "robo-zap-bot" -- run start
  pm2 start npm --name "robo-zap-api" -- run start:api
}

pm2 save

Write-Output "Concluído. Use 'pm2 status' para ver processos e 'pm2 logs' para logs em tempo real."
