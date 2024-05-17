/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author Gianluca Tomasello <giagitom@gmail.com>
 */
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { Structure } from '../../../mol-model/structure';
import { ComplexVisual } from '../complex-visual';
import { WebGLContext } from '../../../mol-gl/webgl/context';
export declare const InterUnitBondCylinderParams: {
    sizeFactor: PD.Numeric;
    sizeAspectRatio: PD.Numeric;
    tryUseImpostor: PD.BooleanParam;
    includeParent: PD.BooleanParam;
    adjustCylinderLength: PD.BooleanParam;
    includeTypes: PD.MultiSelect<"covalent" | "computed" | "aromatic" | "metal-coordination" | "hydrogen-bond" | "disulfide">;
    excludeTypes: PD.MultiSelect<"covalent" | "computed" | "aromatic" | "metal-coordination" | "hydrogen-bond" | "disulfide">;
    ignoreHydrogens: PD.BooleanParam;
    ignoreHydrogensVariant: PD.Select<"all" | "non-polar">;
    aromaticBonds: PD.BooleanParam;
    multipleBonds: PD.Select<"off" | "symmetric" | "offset">;
    linkScale: PD.Numeric;
    linkSpacing: PD.Numeric;
    linkCap: PD.BooleanParam;
    aromaticScale: PD.Numeric;
    aromaticSpacing: PD.Numeric;
    aromaticDashCount: PD.Numeric;
    dashCount: PD.Numeric;
    dashScale: PD.Numeric;
    dashCap: PD.BooleanParam;
    stubCap: PD.BooleanParam;
    radialSegments: PD.Numeric;
    colorMode: PD.Select<"default" | "interpolate">;
    unitKinds: PD.MultiSelect<"spheres" | "atomic" | "gaussians">;
    doubleSided: PD.BooleanParam;
    ignoreLight: PD.BooleanParam;
    xrayShaded: PD.Select<boolean | "inverted">;
    transparentBackfaces: PD.Select<"off" | "on" | "opaque">;
    solidInterior: PD.BooleanParam;
    bumpFrequency: PD.Numeric;
    bumpAmplitude: PD.Numeric;
    alpha: PD.Numeric;
    quality: PD.Select<"custom" | "auto" | "highest" | "higher" | "high" | "medium" | "low" | "lower" | "lowest">;
    material: PD.Group<PD.Normalize<{
        metalness: number;
        roughness: number;
        bumpiness: number;
    }>>;
    clip: PD.Group<PD.Normalize<{
        variant: import("../../../mol-util/clip").Clip.Variant;
        objects: PD.Normalize<{
            type: any;
            invert: any;
            position: any;
            rotation: any;
            scale: any;
        }>[];
    }>>;
    instanceGranularity: PD.BooleanParam;
    lod: PD.Vec3;
    cellSize: PD.Numeric;
    batchSize: PD.Numeric;
    flipSided: PD.BooleanParam;
    flatShaded: PD.BooleanParam;
};
export type InterUnitBondCylinderParams = typeof InterUnitBondCylinderParams;
export declare function InterUnitBondCylinderVisual(materialId: number, structure: Structure, props: PD.Values<InterUnitBondCylinderParams>, webgl?: WebGLContext): ComplexVisual<{
    sizeFactor: PD.Numeric;
    sizeAspectRatio: PD.Numeric;
    tryUseImpostor: PD.BooleanParam;
    includeParent: PD.BooleanParam;
    adjustCylinderLength: PD.BooleanParam;
    includeTypes: PD.MultiSelect<"covalent" | "computed" | "aromatic" | "metal-coordination" | "hydrogen-bond" | "disulfide">;
    excludeTypes: PD.MultiSelect<"covalent" | "computed" | "aromatic" | "metal-coordination" | "hydrogen-bond" | "disulfide">;
    ignoreHydrogens: PD.BooleanParam;
    ignoreHydrogensVariant: PD.Select<"all" | "non-polar">;
    aromaticBonds: PD.BooleanParam;
    multipleBonds: PD.Select<"off" | "symmetric" | "offset">;
    linkScale: PD.Numeric;
    linkSpacing: PD.Numeric;
    linkCap: PD.BooleanParam;
    aromaticScale: PD.Numeric;
    aromaticSpacing: PD.Numeric;
    aromaticDashCount: PD.Numeric;
    dashCount: PD.Numeric;
    dashScale: PD.Numeric;
    dashCap: PD.BooleanParam;
    stubCap: PD.BooleanParam;
    radialSegments: PD.Numeric;
    colorMode: PD.Select<"default" | "interpolate">;
    unitKinds: PD.MultiSelect<"spheres" | "atomic" | "gaussians">;
    doubleSided: PD.BooleanParam;
    ignoreLight: PD.BooleanParam;
    xrayShaded: PD.Select<boolean | "inverted">;
    transparentBackfaces: PD.Select<"off" | "on" | "opaque">;
    solidInterior: PD.BooleanParam;
    bumpFrequency: PD.Numeric;
    bumpAmplitude: PD.Numeric;
    alpha: PD.Numeric;
    quality: PD.Select<"custom" | "auto" | "highest" | "higher" | "high" | "medium" | "low" | "lower" | "lowest">;
    material: PD.Group<PD.Normalize<{
        metalness: number;
        roughness: number;
        bumpiness: number;
    }>>;
    clip: PD.Group<PD.Normalize<{
        variant: import("../../../mol-util/clip").Clip.Variant;
        objects: PD.Normalize<{
            type: any;
            invert: any;
            position: any;
            rotation: any;
            scale: any;
        }>[];
    }>>;
    instanceGranularity: PD.BooleanParam;
    lod: PD.Vec3;
    cellSize: PD.Numeric;
    batchSize: PD.Numeric;
    flipSided: PD.BooleanParam;
    flatShaded: PD.BooleanParam;
}>;
export declare function InterUnitBondCylinderImpostorVisual(materialId: number): ComplexVisual<InterUnitBondCylinderParams>;
export declare function InterUnitBondCylinderMeshVisual(materialId: number): ComplexVisual<InterUnitBondCylinderParams>;
