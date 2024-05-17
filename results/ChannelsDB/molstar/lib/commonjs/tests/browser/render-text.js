"use strict";
/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.html");
const canvas3d_1 = require("../../mol-canvas3d/canvas3d");
const text_builder_1 = require("../../mol-geo/geometry/text/text-builder");
const text_1 = require("../../mol-geo/geometry/text/text");
const param_definition_1 = require("../../mol-util/param-definition");
const color_1 = require("../../mol-util/color");
const representation_1 = require("../../mol-repr/representation");
const spheres_builder_1 = require("../../mol-geo/geometry/spheres/spheres-builder");
const render_object_1 = require("../../mol-gl/render-object");
const spheres_1 = require("../../mol-geo/geometry/spheres/spheres");
const util_1 = require("../../mol-canvas3d/util");
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
function textRepr() {
    const props = {
        ...param_definition_1.ParamDefinition.getDefaultValues(text_1.Text.Params),
        attachment: 'top-right',
        fontQuality: 3,
        fontWeight: 'normal',
        borderWidth: 0.3,
        background: true,
        backgroundOpacity: 0.5,
        tether: true,
        tetherLength: 1.5,
        tetherBaseWidth: 0.5,
    };
    const textBuilder = text_builder_1.TextBuilder.create(props, 1, 1);
    textBuilder.add('Hello world', 0, 0, 0, 1, 1, 0);
    // textBuilder.add('Добрый день', 0, 1, 0, 0, 0)
    // textBuilder.add('美好的一天', 0, 2, 0, 0, 0)
    // textBuilder.add('¿Cómo estás?', 0, -1, 0, 0, 0)
    // textBuilder.add('αβγ Å', 0, -2, 0, 0, 0)
    const text = textBuilder.getText();
    const values = text_1.Text.Utils.createValuesSimple(text, props, (0, color_1.Color)(0xFFDD00), 1);
    const state = text_1.Text.Utils.createRenderableState(props);
    const renderObject = (0, render_object_1.createRenderObject)('text', values, state, -1);
    console.log('text', renderObject, props);
    const repr = representation_1.Representation.fromRenderObject('text', renderObject);
    return repr;
}
function spheresRepr() {
    const spheresBuilder = spheres_builder_1.SpheresBuilder.create(1, 1);
    spheresBuilder.add(0, 0, 0, 0);
    spheresBuilder.add(5, 0, 0, 0);
    spheresBuilder.add(-4, 1, 0, 0);
    const spheres = spheresBuilder.getSpheres();
    const props = param_definition_1.ParamDefinition.getDefaultValues(spheres_1.Spheres.Utils.Params);
    const values = spheres_1.Spheres.Utils.createValuesSimple(spheres, props, (0, color_1.Color)(0xFF0000), 0.2);
    const state = spheres_1.Spheres.Utils.createRenderableState(props);
    const renderObject = (0, render_object_1.createRenderObject)('spheres', values, state, -1);
    console.log('spheres', renderObject);
    const repr = representation_1.Representation.fromRenderObject('spheres', renderObject);
    return repr;
}
canvas3d.add(textRepr());
canvas3d.add(spheresRepr());
canvas3d.requestCameraReset();
