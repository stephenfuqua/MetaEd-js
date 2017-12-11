# This script is based on the Appveyor build script provided in the Atom CI repository for remote builds
# https://github.com/atom/ci/blob/master/build-package.ps1

Set-StrictMode -Version Latest
$script:ROOT_FOLDER = "."
$script:CHECKOUT_FOLDER = "Atom-MetaEd"
Set-Location $script:ROOT_FOLDER
$script:ATOM_CHANNEL = "stable"
$script:ATOM_DIRECTORY_NAME = "Atom"
if ($env:ATOM_CHANNEL -and ($env:ATOM_CHANNEL.tolower() -ne "stable")) {
    $script:ATOM_CHANNEL = "$env:ATOM_CHANNEL"
    $script:ATOM_DIRECTORY_NAME = "$script:ATOM_DIRECTORY_NAME "
    $script:ATOM_DIRECTORY_NAME += $script:ATOM_CHANNEL.substring(0,1).toupper()
    $script:ATOM_DIRECTORY_NAME += $script:ATOM_CHANNEL.substring(1).tolower()
}

$script:ATOM_EXE_PATH = "$script:ROOT_FOLDER\$script:ATOM_DIRECTORY_NAME\atom.exe"
$script:ATOM_SCRIPT_PATH = "$script:ROOT_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\cli\atom.cmd"
$script:APM_SCRIPT_PATH = "$script:ROOT_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\app\apm\bin\apm.cmd"
$script:NPM_SCRIPT_PATH = "$script:ROOT_FOLDER\$script:ATOM_DIRECTORY_NAME\resources\app\apm\node_modules\.bin\npm.cmd"

if ($env:ATOM_LINT_WITH_BUNDLED_NODE -eq "false") {
  $script:ATOM_LINT_WITH_BUNDLED_NODE = "false"
  $script:NPM_SCRIPT_PATH = "npm"
} else {
  $script:ATOM_LINT_WITH_BUNDLED_NODE = "true"
}

$LASTEXITCODE = 0
$APM_TEST_PACKAGES = "linter"

function DownloadAtom() {
    Write-Host "Downloading latest Atom release..."
    $source = "https://atom.io/download/windows_zip?channel=$script:ATOM_CHANNEL"
    $destination = "$script:ROOT_FOLDER\atom.zip"
    (New-Object System.Net.WebClient).DownloadFile($source, $destination)
    
    if ($LASTEXITCODE -ne 0) {
        Exit 1
    }
}

function ExtractAtom() {
    Remove-Item "$script:ROOT_FOLDER\$script:ATOM_DIRECTORY_NAME" -Recurse -ErrorAction Ignore
    Unzip "$script:ROOT_FOLDER\atom.zip" "$script:ROOT_FOLDER"
            
    if ($LASTEXITCODE -ne 0) {
        Exit 1
    }
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
function Unzip
{
    param([string]$zipfile, [string]$outpath)

    [System.IO.Compression.ZipFile]::ExtractToDirectory($zipfile, $outpath)
}

function SetElectronEnvironmentVariables
{
  $env:ELECTRON_NO_ATTACH_CONSOLE = "true"
  [Environment]::SetEnvironmentVariable("ELECTRON_NO_ATTACH_CONSOLE", "true", "User")
  $env:ELECTRON_ENABLE_LOGGING = "YES"
  [Environment]::SetEnvironmentVariable("ELECTRON_ENABLE_LOGGING", "YES", "User")
}

function PrintVersions() {
    & "$script:ATOM_EXE_PATH" --version
    if ($LASTEXITCODE -ne 0) {
        Exit 1
    }
    & "$script:APM_SCRIPT_PATH" -v
    if ($LASTEXITCODE -ne 0) {
        Exit 1
    }
}

function InstallPackage() {
    Write-Host "Downloading package dependencies..."
    
    Push-Location $script:CHECKOUT_FOLDER

    & "..\$script:APM_SCRIPT_PATH" clean
    if ($LASTEXITCODE -ne 0) {
        Exit 1
    }
    if ($script:ATOM_LINT_WITH_BUNDLED_NODE) {
      Write-Host "Running 'apm install' and using bundled node version."
      
      & "..\$script:APM_SCRIPT_PATH" install
      # Set the PATH to include the node.exe bundled with APM
      $newPath = "..\$script:ATOM_DIRECTORY_NAME\resources\app\apm\bin;$env:PATH"
      $env:PATH = $newPath
      [Environment]::SetEnvironmentVariable("PATH", "$newPath", "User")
    } else {
      & "..\$script:APM_SCRIPT_PATH" install --production
      if ($LASTEXITCODE -ne 0) {
          Exit 1
      }
      # Use the system NPM to install the devDependencies
      Write-Host "Using Node.js version:"
      & node --version
      if ($LASTEXITCODE -ne 0) {
          Exit 1
      }
      Write-Host "Using NPM version:"
      & npm --version
      if ($LASTEXITCODE -ne 0) {
          Exit 1
      }
      Write-Host "Installing package.json dependencies..."
      & npm install
    }
    if ($LASTEXITCODE -ne 0) {
        Exit 1
    }
    InstallDependencies
    
    Pop-Location
}

function InstallDependencies() {
    if ($env:APM_TEST_PACKAGES) {
        Write-Host "Installing atom package dependencies..."
        $APM_TEST_PACKAGES = $env:APM_TEST_PACKAGES -split "\s+"
        $APM_TEST_PACKAGES | foreach {
            Write-Host "$_"
            & "..\$script:APM_SCRIPT_PATH" install $_
            if ($LASTEXITCODE -ne 0) {
                Exit 1
            }
        }
    }
}

function RunSpecs() {
    Push-Location $script:CHECKOUT_FOLDER

    & npm test

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Specs failed"
        Exit 1
    }

    Write-Host "Specs passed"
    Pop-Location
}

function RunLinters() {
    Push-Location $script:CHECKOUT_FOLDER

    & npm run eslint

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Lint failed"
        Exit 1
    }

    Write-Host "Lint passed"

    Pop-Location
}

Write-Host "Download Atom"
DownloadAtom

Write-Host "Extract Atom"
ExtractAtom

Write-Host "Set Electron Environment Variables"
SetElectronEnvironmentVariables

Write-Host "Print Versions"
PrintVersions

Write-Host "Install Package"
InstallPackage

Write-Host "Run Specs"
RunSpecs

Write-Host "Run Linters"
RunLinters
