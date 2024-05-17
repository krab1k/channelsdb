/**
 * Copyright (c) 2020-2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { UnitsVisual } from '../units-visual';
export declare const IntraUnitBondLineParams: {
    includeParent: PD.BooleanParam;
    includeTypes: PD.MultiSelect<"covalent" | "computed" | "aromatic" | "metal-coordination" | "hydrogen-bond" | "disulfide">;
    excludeTypes: PD.MultiSelect<"covalent" | "computed" | "aromatic" | "metal-coordination" | "hydrogen-bond" | "disulfide">;
    ignoreHydrogens: PD.BooleanParam;
    ignoreHydrogensVariant: PD.Select<"all" | "non-polar">;
    aromaticBonds: PD.BooleanParam;
    multipleBonds: PD.Select<"off" | "symmetric" | "offset">;
    linkScale: PD.Numeric;
    linkSpacing: PD.Numeric;
    aromaticDashCount: PD.Numeric;
    dashCount: PD.Numeric;
    unitKinds: PD.MultiSelect<"spheres" | "atomic" | "gaussians">;
    sizeFactor: PD.Numeric;
    lineSizeAttenuation: PD.BooleanParam;
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
};
export type IntraUnitBondLineParams = typeof IntraUnitBondLineParams;
export declare function IntraUnitBondLineVisual(materialId: number): UnitsVisual<IntraUnitBondLineParams>;
