"use strict";
/**
 * Copyright (c) 2021-2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGetGLContext = exports.getGLContext = void 0;
const context_1 = require("../webgl/context");
function getGLContext(width, height) {
    const gl = require('gl')(width, height, {
        alpha: true,
        depth: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: true,
        antialias: true,
    });
    return (0, context_1.createContext)(gl);
}
exports.getGLContext = getGLContext;
function tryGetGLContext(width, height, requiredExtensions) {
    try {
        const ctx = getGLContext(width, height);
        if ((requiredExtensions === null || requiredExtensions === void 0 ? void 0 : requiredExtensions.fragDepth) && !ctx.extensions.fragDepth)
            return;
        if ((requiredExtensions === null || requiredExtensions === void 0 ? void 0 : requiredExtensions.textureFloat) && !ctx.extensions.textureFloat)
            return;
        return ctx;
    }
    catch (e) {
        return;
    }
}
exports.tryGetGLContext = tryGetGLContext;
