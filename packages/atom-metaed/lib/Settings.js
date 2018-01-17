/** @babel */
// @flow

export function getCoreMetaEdSourceDirectory(): string {
  return atom.config.get('atom-metaed.coreMetaEdSourceDirectory') || '';
}

export function setCoreMetaEdSourceDirectory(directory: string) {
  return atom.config.set('atom-metaed.coreMetaEdSourceDirectory', directory);
}

export function getMetaEdConsoleSourceDirectory(): string {
  return atom.config.get('atom-metaed.metaEdConsoleSourceDirectory') || '';
}

export function setMetaEdConsoleSourceDirectory(directory: string) {
  return atom.config.set('atom-metaed.metaEdConsoleSourceDirectory', directory);
}

export function getMetaEdJsConsoleSourceDirectory(): string {
  return atom.config.get('atom-metaed.metaEdJsConsoleSourceDirectory') || '';
}

export function setMetaEdJsConsoleSourceDirectory(directory: string) {
  return atom.config.set('atom-metaed.metaEdJsConsoleSourceDirectory', directory);
}

export function getEdfiOdsApiSourceDirectory(): string {
  return atom.config.get('atom-metaed.edfiOdsApiSourceDirectory') || '';
}

export function getCmdFullPath(): string {
  return atom.config.get('atom-metaed.cmdFullPath') || '';
}

export function validateOnTheFly(): boolean {
  return atom.config.get('atom-metaed.validateOnTheFly');
}

export function useTechPreview(): boolean {
  return atom.config.get('atom-metaed.useTechPreview');
}

export function telemetryConsent(): string {
  return atom.config.get('atom-metaed.telemetryConsent');
}

export function setTelemetryConsent(consent: string) {
  return atom.config.set('atom-metaed.telemetryConsent', consent);
}

export function allianceMode(): boolean {
  return atom.config.get('atom-metaed.alliance.allianceMode');
}
