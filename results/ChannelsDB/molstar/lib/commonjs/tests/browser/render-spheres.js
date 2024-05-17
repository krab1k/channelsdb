"use strict";
/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.html");
const util_1 = require("../../mol-canvas3d/util");
const canvas3d_1 = require("../../mol-canvas3d/canvas3d");
const spheres_builder_1 = require("../../mol-geo/geometry/spheres/spheres-builder");
const spheres_1 = require("../../mol-geo/geometry/spheres/spheres");
const color_1 = require("../../mol-util/color");
const render_object_1 = require("../../mol-gl/render-object");
const representation_1 = require("../../mol-repr/representation");
const param_definition_1 = require("../../mol-util/param-definition");
const assets_1 = require("../../mol-util/assets");
const parent = document.getElementById('app');
parent.style.width = '100%';
parent.style.height = '100%';
const canvas = document.createElement('canvas');
parent.appendChild(canvas);
(0, util_1.resizeCanvas)(canvas, parent);
const assetManager = new assets_1.AssetManager();
const canvas3d = canvas3d_1.Canvas3D.create(canvas3d_1.Canvas3DContext.fromCanvas(canvas, assetManager));
canvas3d.animate();
function spheresRepr() {
    const spheresBuilder = spheres_builder_1.SpheresBuilder.create(3, 1);
    spheresBuilder.add(0, 0, 0, 0);
    spheresBuilder.add(5, 0, 0, 0);
    spheresBuilder.add(-4, 1, 0, 0);
    const spheres = spheresBuilder.getSpheres();
    const props = param_definition_1.ParamDefinition.getDefaultValues(spheres_1.Spheres.Utils.Params);
    const values = spheres_1.Spheres.Utils.createValuesSimple(spheres, {}, (0, color_1.Color)(0xFF0000), 1);
    const state = spheres_1.Spheres.Utils.createRenderableState(props);
    const renderObject = (0, render_object_1.createRenderObject)('spheres', values, state, -1);
    console.log(renderObject);
    const repr = representation_1.Representation.fromRenderObject('spheres', renderObject);
    return repr;
}
canvas3d.add(spheresRepr());
canvas3d.requestCameraReset();
