import { State } from '../State';

export function initializeMetaEdEnvironment(state: State): State {
  state.metaEd.allianceMode = state.metaEdConfiguration.allianceMode;
  return state;
}
