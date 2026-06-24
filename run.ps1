# Run this script in PowerShell as a developer to prepare and start the app on Windows.
param()

# Verifica se o script está sendo executado como Administrador
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "ERRO: Este script precisa ser executado como Administrador. Por favor, abra o PowerShell com 'Executar como administrador' e tente novamente."
    exit 1
}

function Check-Last-Command {
    if (-not $?) {
        Write-Error "Comando anterior falhou. Abortando script."
        exit 1
    }
}

Write-Output "1) Verificando pré-requisitos (Node.js e Python)"
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Warning "npm não encontrado na PATH. Instale Node.js antes de prosseguir."
  exit 1
}

if (!(Get-Command py -ErrorAction SilentlyContinue)) {
  Write-Warning "Comando 'py' não encontrado na PATH. Instale o Python Launcher (padrão na instalação do Python para Windows)."
  exit 1
}

Write-Output "2) Instalando dependências do Node.js"
npm install
Check-Last-Command

Write-Output "3) Configurando ambiente virtual Python (.venv)"
if (-not (Test-Path .\.venv)) {
    Write-Output "Criando novo ambiente virtual..."
    py -3.11 -m venv .venv
    Check-Last-Command
}

$pipPath = Join-Path $PSScriptRoot ".venv\Scripts\pip.exe"

if (-not (Test-Path $pipPath)) {
    Write-Error "ERRO: O executável do pip não foi encontrado em '$pipPath'. A criação do ambiente virtual pode ter falhado."
    exit 1
}

Write-Output "Instalando/atualizando dependências Python no .venv..."
try {
    Write-Output "--> Atualizando pip..."
    & $pipPath install --upgrade pip --no-cache-dir | Out-Null
    Write-Output "--> Instalando pacotes de requirements.txt..."
    & $pipPath install -r requirements.txt --no-cache-dir
} catch {
    Write-Error "ERRO CRÍTICO: Falha ao instalar dependências Python. O problema provavelmente é de rede ou um pacote corrompido. Verifique a mensagem de erro abaixo:"
    Write-Error $_.Exception.Message
    exit 1
}

Write-Output "4) Garantindo que o diretório global do npm esteja no PATH da sessão"
$npmBin = & npm bin -g 2>$null
if (-not $npmBin) {
  $npmRoot = & npm root -g 2>$null
  if ($npmRoot) { $npmBin = Join-Path (Split-Path $npmRoot -Parent) 'bin' }
}
if ($npmBin -and ($env:Path -notlike "*${npmBin}*")) {
  Write-Output "Adicionando '$npmBin' ao PATH da sessão atual"
  $env:Path = $env:Path + ";" + $npmBin
}

Write-Output "5) Instalando PM2 (global) se não existir"
if (!(Get-Command pm2 -ErrorAction SilentlyContinue)) {
  npm install -g pm2
  Start-Sleep -Seconds 2
}
Write-Output "6) Tentando adicionar npm global ao PATH do usuário (persistente)"
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

Write-Output "7) Iniciando processos com PM2 (usando arquivo de configuração disponível)"
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
Check-Last-Command

Write-Output "Concluído. Use 'pm2 status' para ver processos e 'pm2 logs' para logs em tempo real."
