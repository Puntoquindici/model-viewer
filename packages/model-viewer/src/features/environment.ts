/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {property} from 'lit/decorators.js';
import {Texture} from 'three';

import ModelViewerElementBase, {$needsRender, $progressTracker, $renderer, $scene, $shouldAttemptPreload} from '../model-viewer-base.js';
import {clamp, Constructor, deserializeUrl} from '../utilities.js';

export const BASE_OPACITY = 0.5;
const DEFAULT_SHADOW_INTENSITY = 0.0;
const DEFAULT_SHADOW_SOFTNESS = 1.0;
const DEFAULT_DIRECTIONAL_SHADOW_RADIUS = 10;
const DEFAULT_DIRECTIONAL_SHADOW_SAMPLES = 8;
const DEFAULT_DIRECTIONAL_LIGHT_INTENSITY = 2.0;
const DEFAULT_DIRECTIONAL_LIGHT_COLOR = '#ffffff';
const DEFAULT_EXPOSURE = 1.0;
const DEFAULT_DIRECTIONAL_LIGHT_AZIMUTH_OFFSET = 0;
const DEFAULT_DIRECTIONAL_LIGHT_ELEVATION_OFFSET = Math.PI / 12;

export const $currentEnvironmentMap = Symbol('currentEnvironmentMap');
export const $currentBackground = Symbol('currentBackground');
export const $updateEnvironment = Symbol('updateEnvironment');
const $cancelEnvironmentUpdate = Symbol('cancelEnvironmentUpdate');

export declare interface EnvironmentInterface {
  environmentImage: string|null;
  skyboxImage: string|null;
  shadowIntensity: number;
  shadowSoftness: number;
  directionalShadowRadius: number;
  directionalShadowSamples: number;
  directionalLight: boolean;
  directionalLightIntensity: number;
  directionalLightColor: string;
  directionalLightAzimuthOffset: number;
  directionalLightElevationOffset: number;
  exposure: number;
  hasBakedShadow(): boolean;
}

export const EnvironmentMixin = <T extends Constructor<ModelViewerElementBase>>(
    ModelViewerElement: T): Constructor<EnvironmentInterface>&T => {
  class EnvironmentModelViewerElement extends ModelViewerElement {
    @property({type: String, attribute: 'environment-image'})
    environmentImage: string|null = null;

    @property({type: String, attribute: 'skybox-image'})
    skyboxImage: string|null = null;

    @property({type: Number, attribute: 'shadow-intensity'})
    shadowIntensity: number = DEFAULT_SHADOW_INTENSITY;

    @property({type: Number, attribute: 'shadow-softness'})
    shadowSoftness: number = DEFAULT_SHADOW_SOFTNESS;

    @property({type: Number, attribute: 'directional-shadow-radius'})
    directionalShadowRadius: number = DEFAULT_DIRECTIONAL_SHADOW_RADIUS;

    @property({type: Number, attribute: 'directional-shadow-samples'})
    directionalShadowSamples: number = DEFAULT_DIRECTIONAL_SHADOW_SAMPLES;

    @property({type: Boolean, attribute: 'directional-light'})
    directionalLight: boolean = false;

    @property({type: Number, attribute: 'directional-light-intensity'})
    directionalLightIntensity: number = DEFAULT_DIRECTIONAL_LIGHT_INTENSITY;

    @property({type: String, attribute: 'directional-light-color'})
    directionalLightColor: string = DEFAULT_DIRECTIONAL_LIGHT_COLOR;

    @property({type: Number, attribute: 'directional-light-azimuth-offset'})
    directionalLightAzimuthOffset: number =
        DEFAULT_DIRECTIONAL_LIGHT_AZIMUTH_OFFSET;

    @property({type: Number, attribute: 'directional-light-elevation-offset'})
    directionalLightElevationOffset: number =
        DEFAULT_DIRECTIONAL_LIGHT_ELEVATION_OFFSET;

    @property({
      type: Number,
    })
    exposure: number = DEFAULT_EXPOSURE;

    protected[$currentEnvironmentMap]: Texture|null = null;
    protected[$currentBackground]: Texture|null = null;

    private[$cancelEnvironmentUpdate]: ((...args: any[]) => any)|null = null;

    updated(changedProperties: Map<string|number|symbol, unknown>) {
      super.updated(changedProperties);

      if (changedProperties.has('shadowIntensity')) {
        this[$scene].setShadowIntensity(this.shadowIntensity * BASE_OPACITY);
        this[$needsRender]();
      }

      if (changedProperties.has('shadowSoftness')) {
        this[$scene].setShadowSoftness(this.shadowSoftness);
        this[$needsRender]();
      }

      if (changedProperties.has('directionalShadowRadius')) {
        this[$scene].setDirectionalShadowRadius(this.directionalShadowRadius);
        this[$needsRender]();
      }

      if (changedProperties.has('directionalShadowSamples')) {
        this[$scene].setDirectionalShadowSamples(this.directionalShadowSamples);
        this[$needsRender]();
      }

      if (changedProperties.has('directionalLight') ||
          changedProperties.has('directionalLightIntensity') ||
          changedProperties.has('directionalLightColor')) {
        this[$scene].setDirectionalLightEnabled(this.directionalLight);
        this[$scene].setDirectionalLightIntensity(this.directionalLightIntensity);
        this[$scene].setDirectionalLightColor(this.directionalLightColor);
        this[$needsRender]();
      }

      if (changedProperties.has('directionalLightAzimuthOffset')) {
        this[$scene].setDirectionalLightAzimuthOffset(
            this.directionalLightAzimuthOffset);
      }

      if (changedProperties.has('directionalLightElevationOffset')) {
        this[$scene].setDirectionalLightElevationOffset(
            this.directionalLightElevationOffset);
      }

      if (changedProperties.has('exposure')) {
        this[$scene].exposure = this.exposure;
        this[$needsRender]();
      }

      if ((changedProperties.has('environmentImage') ||
           changedProperties.has('skyboxImage')) &&
          this[$shouldAttemptPreload]()) {
        this[$updateEnvironment]();
      }
    }

    hasBakedShadow(): boolean {
      return this[$scene].bakedShadows.size > 0;
    }

    async[$updateEnvironment]() {
      const {skyboxImage, environmentImage} = this;

      if (this[$cancelEnvironmentUpdate] != null) {
        this[$cancelEnvironmentUpdate]!();
        this[$cancelEnvironmentUpdate] = null;
      }

      const {textureUtils} = this[$renderer];

      if (textureUtils == null) {
        return;
      }

      const updateEnvProgress = this[$progressTracker].beginActivity();

      try {
        const {environmentMap, skybox} =
            await textureUtils.generateEnvironmentMapAndSkybox(
                deserializeUrl(skyboxImage),
                environmentImage,
                (progress: number) => updateEnvProgress(clamp(progress, 0, 1)));

        if (this[$currentEnvironmentMap] !== environmentMap) {
          this[$currentEnvironmentMap] = environmentMap;
          this.dispatchEvent(new CustomEvent('environment-change'));
        }
        if (skybox != null) {
          // When using the same environment and skybox, use the environment as
          // it gives HDR filtering.
          this[$currentBackground] =
              skybox.name === environmentMap.name ? environmentMap : skybox;
        } else {
          this[$currentBackground] = null;
        }

        this[$scene].setEnvironmentAndSkybox(
            this[$currentEnvironmentMap], this[$currentBackground]);
        this[$scene].dispatchEvent({type: 'envmap-update'});
      } catch (errorOrPromise) {
        if (errorOrPromise instanceof Error) {
          this[$scene].setEnvironmentAndSkybox(null, null);
          throw errorOrPromise;
        }
      } finally {
        updateEnvProgress(1.0);
      }
    }
  }

  return EnvironmentModelViewerElement;
};
