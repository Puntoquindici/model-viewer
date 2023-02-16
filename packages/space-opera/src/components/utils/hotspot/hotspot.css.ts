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


import {css, CSSResult} from 'lit';

export const styles: CSSResult = css`
 
  .Hotspot {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdmlld0JveD0iMCAwIDI5IDI5Ij4KICA8ZyBpZD0iUmFnZ3J1cHBhXzE3NjUiIGRhdGEtbmFtZT0iUmFnZ3J1cHBhIDE3NjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yOTkgLTQ0MikiPgogICAgPGcgaWQ9IkVsbGlzc2VfNDYiIGRhdGEtbmFtZT0iRWxsaXNzZSA0NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjk5IDQ0MikiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzFjMWIxZiIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjgiPgogICAgICA8Y2lyY2xlIGN4PSIxNC41IiBjeT0iMTQuNSIgcj0iMTQuNSIgc3Ryb2tlPSJub25lIi8+CiAgICAgIDxjaXJjbGUgY3g9IjE0LjUiIGN5PSIxNC41IiByPSIxNCIgZmlsbD0ibm9uZSIvPgogICAgPC9nPgogICAgPGcgaWQ9IlJhZ2dydXBwYV8xNzIyIiBkYXRhLW5hbWU9IlJhZ2dydXBwYSAxNzIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5Mi41IDE2Ni41KSI+CiAgICAgIDxsaW5lIGlkPSJMaW5lYV8zODQiIGRhdGEtbmFtZT0iTGluZWEgMzg0IiB4Mj0iMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNC41IDI5MC41KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzMjNkIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgICAgPGxpbmUgaWQ9IkxpbmVhXzM4NSIgZGF0YS1uYW1lPSJMaW5lYSAzODUiIHkxPSIxNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIxLjUgMjgzLjUpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMyM2QiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==');
    border-radius: 32px;
    border: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    cursor: pointer;
    height: 29px;
    position: relative;
    transition: opacity 0.3s;
    width: 29px;
    font-size: 14px;
  }

  .Hotspot:not([data-visible]) {
    background: transparent !important;
    border: 4px solid #fff;
    box-shadow: none;
    height: 20px;
    pointer-events: none;
    width: 20px;
  }

  .Hotspot:is([data-visible]).clicked {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdmlld0JveD0iMCAwIDI5IDI5Ij4KICA8ZyBpZD0iUmFnZ3J1cHBhXzE3NjQiIGRhdGEtbmFtZT0iUmFnZ3J1cHBhIDE3NjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDcgLTI3NikiPgogICAgPGcgaWQ9IlRyYWNjaWF0b18yNjQ1IiBkYXRhLW5hbWU9IlRyYWNjaWF0byAyNjQ1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDcgMjc2KSIgZmlsbD0iIzFjMWIxZiIgb3BhY2l0eT0iMC44Ij4KICAgICAgPHBhdGggZD0iTSAxNC41IDI4LjUgQyAxMC43NjA0NTk4OTk5MDIzNCAyOC41IDcuMjQ0NzYwMDM2NDY4NTA2IDI3LjA0Mzc1MDc2MjkzOTQ1IDQuNjAwNTAwMTA2ODExNTIzIDI0LjM5OTQ5OTg5MzE4ODQ4IEMgMS45NTYyNDk5NTIzMTYyODQgMjEuNzU1MjM5NDg2Njk0MzQgMC41IDE4LjIzOTU0MDEwMDA5NzY2IDAuNSAxNC41IEMgMC41IDEwLjc2MDQ1OTg5OTkwMjM0IDEuOTU2MjQ5OTUyMzE2Mjg0IDcuMjQ0NzYwMDM2NDY4NTA2IDQuNjAwNTAwMTA2ODExNTIzIDQuNjAwNTAwMTA2ODExNTIzIEMgNy4yNDQ3NjAwMzY0Njg1MDYgMS45NTYyNDk5NTIzMTYyODQgMTAuNzYwNDU5ODk5OTAyMzQgMC41IDE0LjUgMC41IEMgMTguMjM5NTQwMTAwMDk3NjYgMC41IDIxLjc1NTIzOTQ4NjY5NDM0IDEuOTU2MjQ5OTUyMzE2Mjg0IDI0LjM5OTQ5OTg5MzE4ODQ4IDQuNjAwNTAwMTA2ODExNTIzIEMgMjcuMDQzNzUwNzYyOTM5NDUgNy4yNDQ3NjAwMzY0Njg1MDYgMjguNSAxMC43NjA0NTk4OTk5MDIzNCAyOC41IDE0LjUgQyAyOC41IDE5LjEzMjc3MDUzODMzMDA4IDI2LjIzMjUwOTYxMzAzNzExIDIzLjM3NjA3MDAyMjU4MzAxIDIyLjI3ODk0OTczNzU0ODgzIDI2LjE0MTg4MDAzNTQwMDM5IEMgMjAuMTQ0NjIwODk1Mzg1NzQgMjcuNjQwNjg5ODQ5ODUzNTIgMTcuMzA5NTcwMzEyNSAyOC41IDE0LjUgMjguNSBaIiBzdHJva2U9Im5vbmUiLz4KICAgICAgPHBhdGggZD0iTSAxNC41IDEgQyAxMC44OTQwMjAwODA1NjY0MSAxIDcuNTAzODcwMDEwMzc1OTc3IDIuNDA0MjM5NjU0NTQxMDE2IDQuOTU0MDU5NjAwODMwMDc4IDQuOTU0MDU5NjAwODMwMDc4IEMgMi40MDQyMzk2NTQ1NDEwMTYgNy41MDM4NzAwMTAzNzU5NzcgMSAxMC44OTQwMjAwODA1NjY0MSAxIDE0LjUgQyAxIDE4LjEwNTk3OTkxOTQzMzU5IDIuNDA0MjM5NjU0NTQxMDE2IDIxLjQ5NjEyOTk4OTYyNDAyIDQuOTU0MDU5NjAwODMwMDc4IDI0LjA0NTk0MDM5OTE2OTkyIEMgNy41MDM4NzAwMTAzNzU5NzcgMjYuNTk1NzYwMzQ1NDU4OTggMTAuODk0MDIwMDgwNTY2NDEgMjggMTQuNSAyOCBDIDE3LjIwOTE0MDc3NzU4Nzg5IDI4IDE5LjkzOTQ2MDc1NDM5NDUzIDI3LjE3Mzc4OTk3ODAyNzM0IDIxLjk5MjMzMDU1MTE0NzQ2IDI1LjczMjE3OTY0MTcyMzYzIEMgMjUuODEwMjg5MzgyOTM0NTcgMjMuMDYxMjQxMTQ5OTAyMzQgMjggMTguOTY3MjY5ODk3NDYwOTQgMjggMTQuNSBDIDI4IDEwLjg5NDAyMDA4MDU2NjQxIDI2LjU5NTc2MDM0NTQ1ODk4IDcuNTAzODcwMDEwMzc1OTc3IDI0LjA0NTk0MDM5OTE2OTkyIDQuOTU0MDU5NjAwODMwMDc4IEMgMjEuNDk2MTI5OTg5NjI0MDIgMi40MDQyMzk2NTQ1NDEwMTYgMTguMTA1OTc5OTE5NDMzNTkgMSAxNC41IDEgTSAxNC41IDAgQyAyMi41MDgxMjkxMTk4NzMwNSAwIDI5IDYuNDkxODcwODgwMTI2OTUzIDI5IDE0LjUgQyAyOSAxOS40MTY5OTAyODAxNTEzNyAyNi41NTI1ODk0MTY1MDM5MSAyMy43NjIzNTk2MTkxNDA2MiAyMi41NjU1NTkzODcyMDcwMyAyNi41NTE1ODA0MjkwNzcxNSBDIDIwLjQ1NjM1OTg2MzI4MTI1IDI4LjAzMjczOTYzOTI4MjIzIDE3LjU5MTE0MDc0NzA3MDMxIDI5IDE0LjUgMjkgQyA2LjQ5MTg3MDg4MDEyNjk1MyAyOSAwIDIyLjUwODEyOTExOTg3MzA1IDAgMTQuNSBDIDAgNi40OTE4NzA4ODAxMjY5NTMgNi40OTE4NzA4ODAxMjY5NTMgMCAxNC41IDAgWiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjZmZmIi8+CiAgICA8L2c+CiAgICA8ZyBpZD0iUmFnZ3J1cHBhXzE3MjEiIGRhdGEtbmFtZT0iUmFnZ3J1cHBhIDE3MjEiPgogICAgICA8bGluZSBpZD0iTGluZWFfMzg0IiBkYXRhLW5hbWU9IkxpbmVhIDM4NCIgeDI9IjE0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTQuNSAyOTAuNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K');
    height: 29px;
    outline: none;
    width: 29px;
  }

  .Hotspot.clicked .HotspotAnnotation {
    display: block;
  }

  .HotspotAnnotation {
    background: #fff;
    border-radius: 4px;
    border: 1px solid #161616;
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);*/
    color: rgba(0, 0, 0, 0.8);
    display: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: normal;
    max-width: 128px;
    padding: 1em 1.5em;
    position: absolute;
    width: max-content;
    overflow-wrap: break-word;
    text-align: left;
  }

  .HotspotAnnotation.right {
    top: 50%;
    left: calc(100% + 1em);
  }

  .HotspotAnnotation.left {
    top: 50%;
    right: calc(100% + 1em);
  }

  .HotspotAnnotation.up {
    transform: translateX(-50%);
    left: 50%;
    bottom: calc(100% + 1em);
  }

  .HotspotAnnotation.upleft {
    transform: translateX(calc(-100% - 2em));
    left: 50%;
    bottom: calc(100% + 1em);
  }
  
  .HotspotAnnotation.upright {
    transform: translateX(calc(0% + 2em));
    left: 50%;
    bottom: calc(100% + 1em);
  }

  .HotspotAnnotation.down {
    transform: translateX(-50%);
    left: 50%;
    top: calc(100% + 1em);
  }

  .HotspotAnnotation.downleft {
    transform: translateX(calc(-100% - 2em));
    left: 50%;
    top: calc(100% + 1em);
  }

  .HotspotAnnotation.downright {
    transform: translateX(calc(0% + 2em));
    left: 50%;
    top: calc(100% + 1em);
  }

  .Hotspot.clicked .HotspotAnnotation .HotspotAnnotationText {
    display: block;
    margin-top:0px;
    margin-bottom:0px;
  }

  .bold {
    font-weight: bold;
  }

  .HotspotAnnotationTitle {
    margin-top: 0;
    margin-bottom: 0;
  }

  a.HotspotAnnotationText {
    margin-left: 5px;
    margin-top: 16px !important;
    color: var(--bubble-foreground);
    text-decoration: underline;
    font-weight: bold;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .Hotspot > * {
    opacity: 1;
    transform: translateY(-50%);
    transition: opacity 0.3s;
  }

  .Hotspot:not([data-visible]) > * {
    opacity: 0;
    pointer-events: none;
    transform: translateY(calc(-50% + 4px));
    transition: all 0.3s;
  }

  .Hotspot.hidden, .Dimension.hidden {
    display: none !important;
  }

  .Dimension.dot {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    background: #ddd;
    --min-hotspot-opacity: 0;
    padding: 0;
  }

  .Dimension.dim {
    background: #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Futura, Helvetica Neue, sans-serif
    font-size: 18px;
    font-weight: 700;
    max-width: 128px;
    overflow-wrap: break-word;
    padding: 0.5em 1em;
    position: absolute;
    width: max-content;
    height: max-content;
    transform: translate3d(-50%, -50%, 0);
    --min-hotspot-opacity: 0;
  }

  .Dimension.show, .Hotspot.show {
    --min-hotspot-opacity: 1;
  }
`;
