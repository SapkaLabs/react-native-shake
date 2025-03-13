import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { EventEmitter } from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  readonly onShake: EventEmitter<void>;
  /**
   * Emit a shake event to JS via the native event emitter.
   * Purely for testing purposes, because the android emulator does not support shaking.
   */
  emitShakeEvent(): void;
}

export const Shake = TurboModuleRegistry.getEnforcing<Spec>('Shake');
