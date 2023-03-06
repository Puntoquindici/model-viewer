/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
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
 *
 */

import {HotspotConfig} from '../../hotspot_panel/types.js';

/**
 * Renders a list of hotspots
 */
export function renderHotspots(hotspots: HotspotConfig[]) {
  const existingNames = new Set();
  for (const hotspot of hotspots) {
    if (existingNames.has(hotspot.name)) {
      throw new Error(`Hotspot contains duplicate name: ${hotspot.name}`);
    }
    existingNames.add(hotspot.name);
  }
  return hotspots.map(hotspot => renderHotspot(hotspot));
}

/**
 * Render a hotspot
 */
export function renderHotspot(config: HotspotConfig) {
  // Note that we have to do this without lit html because rendering slot name
  // will result in zClosurez
  const onHotspotClicked = (target: HTMLElement) => {
    target.classList.toggle('clicked');
  }

  const hotspotElement = document.createElement('div');
  hotspotElement.classList.add('Hotspot');
  hotspotElement.slot = `hotspot-${config.name}`;
  hotspotElement.dataset['position'] = config.position.toString();
  if (config.normal) {
    hotspotElement.dataset['normal'] = config.normal.toString();
  }
  hotspotElement.dataset['visibilityAttribute'] = 'visible';
  hotspotElement.onmousedown = (e) => {
    e.stopPropagation();
    // toggle hotspot clicked
    onHotspotClicked(hotspotElement);
  }

  if (config.annotation && !config.title) {
    const annotationElement = document.createElement('div');
    annotationElement.classList.add('HotspotAnnotation');
    if(config.defaultOpen) {
      onHotspotClicked(hotspotElement);
    }
    annotationElement.classList.add(config.align ?? 'right');
    annotationElement.textContent = config.annotation;
    hotspotElement.appendChild(annotationElement);
  } else {
    if(!config.title && config.link) {
      const annotationParent = document.createElement('div');
      annotationParent.classList.add('HotspotAnnotation');
      if(config.defaultOpen) {
        onHotspotClicked(hotspotElement);
      }
      annotationParent.classList.add(config.align ?? 'right');
      hotspotElement.appendChild(annotationParent);
      const iconSvg = "<svg style='margin-left: 5px;' xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 27.068 27.62\">\n" +
        "  <g id=\"Raggruppa_1742\" data-name=\"Raggruppa 1742\" transform=\"translate(0.5 0.854)\">\n" +
        "    <path id=\"Tracciato_2612\" data-name=\"Tracciato 2612\" d=\"M1,14.358,15.358,0\" transform=\"translate(6.334 4.014)\" fill=\"#00b0be\" stroke=\"#33323d\" stroke-linecap=\"round\" stroke-width=\"1\"/>\n" +
        "    <path id=\"Tracciato_2610\" data-name=\"Tracciato 2610\" d=\"M0,0,5.56,5.56,11.12,0\" transform=\"translate(21.783 11.794) rotate(-135)\" fill=\"none\" stroke=\"#33323d\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"/>\n" +
        "    <path id=\"Tracciato_2611\" data-name=\"Tracciato 2611\" d=\"M8236.109-16097.653h-8.293v19.35h19.1v-8.322\" transform=\"translate(-8227.816 16104.568)\" fill=\"none\" stroke=\"#33323d\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"/>\n" +
        "  </g>\n" +
        "</svg>\n";
      const annotationText = document.createElement('a');
      annotationText.href = config.link.startsWith('http') ? config.link : 'https://' + config.link;
      annotationText.target = '_blank';
      annotationText.classList.add('HotspotAnnotationText');
      annotationText.classList.add('single');
      annotationText.innerHTML = config.linkLabel ? '<span style="flex-grow:1">'+config.linkLabel+'</span>' + iconSvg : '<span style="flex-grow:1">Learn more</span>' + iconSvg;
      annotationParent.appendChild(annotationText);
    }
    if (config.title) {
      const annotationParent = document.createElement('div');
      annotationParent.classList.add('HotspotAnnotation');
      if(config.defaultOpen) {
        onHotspotClicked(hotspotElement);
      }
      annotationParent.classList.add(config.align ?? 'right');
      hotspotElement.appendChild(annotationParent);

      const annotationTitle = document.createElement('p');
      annotationTitle.classList.add('bold');
      annotationTitle.classList.add('HotspotAnnotationTitle');
      annotationTitle.textContent = config.title;
      annotationParent.appendChild(annotationTitle);

      if(config.annotation) {
        const annotationText = document.createElement('p');
        annotationTitle.classList.add('multi');
        annotationText.classList.add('HotspotAnnotationText');
        annotationText.textContent = config.annotation;
        annotationParent.appendChild(annotationText);
      }

      if(config.link) {
        const iconSvg = "<svg style='margin-left: 5px;' xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 27.068 27.62\">\n" +
          "  <g id=\"Raggruppa_1742\" data-name=\"Raggruppa 1742\" transform=\"translate(0.5 0.854)\">\n" +
          "    <path id=\"Tracciato_2612\" data-name=\"Tracciato 2612\" d=\"M1,14.358,15.358,0\" transform=\"translate(6.334 4.014)\" fill=\"#00b0be\" stroke=\"#33323d\" stroke-linecap=\"round\" stroke-width=\"1\"/>\n" +
          "    <path id=\"Tracciato_2610\" data-name=\"Tracciato 2610\" d=\"M0,0,5.56,5.56,11.12,0\" transform=\"translate(21.783 11.794) rotate(-135)\" fill=\"none\" stroke=\"#33323d\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"/>\n" +
          "    <path id=\"Tracciato_2611\" data-name=\"Tracciato 2611\" d=\"M8236.109-16097.653h-8.293v19.35h19.1v-8.322\" transform=\"translate(-8227.816 16104.568)\" fill=\"none\" stroke=\"#33323d\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"/>\n" +
          "  </g>\n" +
          "</svg>\n";
        const annotationText = document.createElement('a');
        annotationText.href = config.link.startsWith('http') ? config.link : 'https://' + config.link;
        annotationText.target = '_blank';
        annotationText.classList.add('HotspotAnnotationText');
        annotationText.innerHTML = config.linkLabel ? '<span style="flex-grow:1">'+config.linkLabel+'</span>' + iconSvg : '<span style="flex-grow:1">Learn more</span>' + iconSvg;
        annotationParent.appendChild(annotationText);

      }
    }
  }

  return hotspotElement;
}
