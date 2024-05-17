"use strict";
/**
 * Copyright (c) 2019-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.html");
const util_1 = require("../../mol-canvas3d/util");
const canvas3d_1 = require("../../mol-canvas3d/canvas3d");
const names_1 = require("../../mol-util/color/names");
const geometry_1 = require("../../mol-math/geometry");
const int_1 = require("../../mol-data/int");
const linear_algebra_1 = require("../../mol-math/linear-algebra");
const gaussian_density_1 = require("../../mol-math/geometry/gaussian-density");
const active_voxels_1 = require("../../mol-gl/compute/marching-cubes/active-voxels");
const reduction_1 = require("../../mol-gl/compute/histogram-pyramid/reduction");
const isosurface_1 = require("../../mol-gl/compute/marching-cubes/isosurface");
const texture_mesh_1 = require("../../mol-geo/geometry/texture-mesh/texture-mesh");
const color_1 = require("../../mol-util/color");
const render_object_1 = require("../../mol-gl/render-object");
const representation_1 = require("../../mol-repr/representation");
const algorithm_1 = require("../../mol-geo/util/marching-cubes/algorithm");
const mesh_1 = require("../../mol-geo/geometry/mesh/mesh");
const param_definition_1 = require("../../mol-util/param-definition");
const assets_1 = require("../../mol-util/assets");
const parent = document.getElementById('app');
parent.style.width = '100%';
parent.style.height = '100%';
const canvas = document.createElement('canvas');
parent.appendChild(canvas);
(0, util_1.resizeCanvas)(canvas, parent);
const assetManager = new assets_1.AssetManager();
const canvas3d = canvas3d_1.Canvas3D.create(canvas3d_1.Canvas3DContext.fromCanvas(canvas, assetManager), param_definition_1.ParamDefinition.merge(canvas3d_1.Canvas3DParams, param_definition_1.ParamDefinition.getDefaultValues(canvas3d_1.Canvas3DParams), {
    renderer: { backgroundColor: names_1.ColorNames.white },
    camera: { mode: 'orthographic' }
}));
canvas3d.animate();
async function init() {
    const { webgl } = canvas3d;
    const position = {
        x: [0, 2],
        y: [0, 2],
        z: [0, 2],
        indices: int_1.OrderedSet.ofSortedArray([0, 1]),
    };
    const box = geometry_1.Box3D.create(linear_algebra_1.Vec3.create(0, 0, 0), linear_algebra_1.Vec3.create(2, 2, 2));
    const radius = () => 1.8;
    const props = {
        resolution: 0.1,
        radiusOffset: 0,
        smoothness: 1.5
    };
    const isoValue = Math.exp(-props.smoothness);
    if (true) {
        console.time('gpu gaussian2');
        const densityTextureData2 = await (0, gaussian_density_1.computeGaussianDensityTexture2d)(position, box, radius, props, webgl).run();
        webgl.waitForGpuCommandsCompleteSync();
        console.timeEnd('gpu gaussian2');
        console.time('gpu mc2');
        console.time('gpu mc active2');
        const activeVoxelsTex2 = (0, active_voxels_1.calcActiveVoxels)(webgl, densityTextureData2.texture, densityTextureData2.gridDim, densityTextureData2.gridTexDim, isoValue, densityTextureData2.gridTexScale);
        webgl.waitForGpuCommandsCompleteSync();
        console.timeEnd('gpu mc active2');
        console.time('gpu mc pyramid2');
        const compacted2 = (0, reduction_1.createHistogramPyramid)(webgl, activeVoxelsTex2, densityTextureData2.gridTexScale, densityTextureData2.gridTexDim);
        webgl.waitForGpuCommandsCompleteSync();
        console.timeEnd('gpu mc pyramid2');
        console.time('gpu mc vert2');
        (0, isosurface_1.createIsosurfaceBuffers)(webgl, activeVoxelsTex2, densityTextureData2.texture, compacted2, densityTextureData2.gridDim, densityTextureData2.gridTexDim, densityTextureData2.transform, isoValue, false, true, linear_algebra_1.Vec3.create(0, 1, 2), true);
        webgl.waitForGpuCommandsCompleteSync();
        console.timeEnd('gpu mc vert2');
        console.timeEnd('gpu mc2');
    }
    console.time('gpu gaussian');
    const densityTextureData = await (0, gaussian_density_1.computeGaussianDensityTexture2d)(position, box, radius, props, webgl).run();
    webgl.waitForGpuCommandsCompleteSync();
    console.timeEnd('gpu gaussian');
    console.time('gpu mc');
    console.time('gpu mc active');
    const activeVoxelsTex = (0, active_voxels_1.calcActiveVoxels)(webgl, densityTextureData.texture, densityTextureData.gridDim, densityTextureData.gridTexDim, isoValue, densityTextureData.gridTexScale);
    webgl.waitForGpuCommandsCompleteSync();
    console.timeEnd('gpu mc active');
    console.time('gpu mc pyramid');
    const compacted = (0, reduction_1.createHistogramPyramid)(webgl, activeVoxelsTex, densityTextureData.gridTexScale, densityTextureData.gridTexDim);
    webgl.waitForGpuCommandsCompleteSync();
    console.timeEnd('gpu mc pyramid');
    console.time('gpu mc vert');
    const gv = (0, isosurface_1.createIsosurfaceBuffers)(webgl, activeVoxelsTex, densityTextureData.texture, compacted, densityTextureData.gridDim, densityTextureData.gridTexDim, densityTextureData.transform, isoValue, false, true, linear_algebra_1.Vec3.create(0, 1, 2), true);
    webgl.waitForGpuCommandsCompleteSync();
    console.timeEnd('gpu mc vert');
    console.timeEnd('gpu mc');
    console.log({ ...webgl.stats, programCount: webgl.stats.resourceCounts.program, shaderCount: webgl.stats.resourceCounts.shader });
    const mcBoundingSphere = geometry_1.Sphere3D.fromBox3D((0, geometry_1.Sphere3D)(), densityTextureData.bbox);
    const mcIsosurface = texture_mesh_1.TextureMesh.create(gv.vertexCount, 1, gv.vertexTexture, gv.groupTexture, gv.normalTexture, mcBoundingSphere);
    const mcIsoSurfaceProps = {
        ...param_definition_1.ParamDefinition.getDefaultValues(texture_mesh_1.TextureMesh.Params),
        doubleSided: true,
        flatShaded: true,
        alpha: 1.0
    };
    const mcIsoSurfaceValues = texture_mesh_1.TextureMesh.Utils.createValuesSimple(mcIsosurface, mcIsoSurfaceProps, (0, color_1.Color)(0x112299), 1);
    // console.log('mcIsoSurfaceValues', mcIsoSurfaceValues)
    const mcIsoSurfaceState = texture_mesh_1.TextureMesh.Utils.createRenderableState(mcIsoSurfaceProps);
    const mcIsoSurfaceRenderObject = (0, render_object_1.createRenderObject)('texture-mesh', mcIsoSurfaceValues, mcIsoSurfaceState, -1);
    const mcIsoSurfaceRepr = representation_1.Representation.fromRenderObject('texture-mesh', mcIsoSurfaceRenderObject);
    canvas3d.add(mcIsoSurfaceRepr);
    canvas3d.requestCameraReset();
    //
    console.time('cpu gaussian');
    const densityData = await (0, gaussian_density_1.computeGaussianDensity)(position, box, radius, props).run();
    console.timeEnd('cpu gaussian');
    console.log({ densityData });
    const params = {
        isoLevel: isoValue,
        scalarField: densityData.field,
        idField: densityData.idField
    };
    console.time('cpu mc');
    const surface = await (0, algorithm_1.computeMarchingCubesMesh)(params).run();
    console.timeEnd('cpu mc');
    console.log('surface', surface);
    mesh_1.Mesh.transform(surface, densityData.transform);
    const meshProps = {
        ...param_definition_1.ParamDefinition.getDefaultValues(mesh_1.Mesh.Params),
        doubleSided: true,
        flatShaded: false,
        alpha: 1.0
    };
    const meshValues = mesh_1.Mesh.Utils.createValuesSimple(surface, meshProps, (0, color_1.Color)(0x995511), 1);
    const meshState = mesh_1.Mesh.Utils.createRenderableState(meshProps);
    const meshRenderObject = (0, render_object_1.createRenderObject)('mesh', meshValues, meshState, -1);
    const meshRepr = representation_1.Representation.fromRenderObject('mesh', meshRenderObject);
    canvas3d.add(meshRepr);
    canvas3d.requestCameraReset();
}
init();
