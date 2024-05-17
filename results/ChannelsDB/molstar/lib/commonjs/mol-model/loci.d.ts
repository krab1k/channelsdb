/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
import { StructureElement } from './structure';
import { Bond } from './structure/structure/unit/bonds';
import { Shape, ShapeGroup } from './shape';
import { Sphere3D } from '../mol-math/geometry';
import { Vec3 } from '../mol-math/linear-algebra';
import { Structure } from './structure/structure';
import { PrincipalAxes } from '../mol-math/linear-algebra/matrix/principal-axes';
import { FiniteArray } from '../mol-util/type-helpers';
import { Volume } from './volume/volume';
/** A Loci that includes every loci */
export declare const EveryLoci: {
    kind: "every-loci";
};
export type EveryLoci = typeof EveryLoci;
export declare function isEveryLoci(x?: Loci): x is EveryLoci;
/** A Loci that is empty */
export declare const EmptyLoci: {
    kind: "empty-loci";
};
export type EmptyLoci = typeof EmptyLoci;
export declare function isEmptyLoci(x?: Loci): x is EmptyLoci;
/** A generic data loci */
export interface DataLoci<T = unknown, E = unknown> {
    readonly kind: 'data-loci';
    readonly tag: string;
    readonly data: T;
    readonly elements: ReadonlyArray<E>;
    /** if undefined, won't zoom */
    getBoundingSphere?(boundingSphere: Sphere3D): Sphere3D;
    getLabel(): string;
}
export declare function isDataLoci(x?: Loci): x is DataLoci;
export declare function areDataLociEqual(a: DataLoci, b: DataLoci): boolean;
export declare function isDataLociEmpty(loci: DataLoci): boolean;
export declare function DataLoci<T = unknown, E = unknown>(tag: string, data: T, elements: ReadonlyArray<E>, getBoundingSphere: DataLoci<T, E>['getBoundingSphere'], getLabel: DataLoci<T, E>['getLabel']): DataLoci<T, E>;
export { Loci };
type Loci = StructureElement.Loci | Structure.Loci | Bond.Loci | EveryLoci | EmptyLoci | DataLoci | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
declare namespace Loci {
    export interface Bundle<L extends number> {
        loci: FiniteArray<Loci, L>;
    }
    export function getBundleBoundingSphere(bundle: Bundle<any>): Sphere3D;
    export function areEqual(lociA: Loci, lociB: Loci): boolean;
    export function isEvery(loci?: Loci): loci is EveryLoci;
    export function isEmpty(loci: Loci): boolean;
    export function remap<T>(loci: Loci, data: T): Loci;
    export function getBoundingSphere(loci: Loci, boundingSphere?: Sphere3D): Sphere3D | undefined;
    export function getCenter(loci: Loci, center?: Vec3): Vec3 | undefined;
    export function getPrincipalAxes(loci: Loci): PrincipalAxes | undefined;
    const Granularity: {
        element: (loci: Loci) => Loci;
        residue: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        chain: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        entity: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        model: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        operator: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        structure: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Segment.Loci;
        elementInstances: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        residueInstances: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
        chainInstances: (loci: Loci) => StructureElement.Loci | Structure.Loci | Bond.Loci | {
            kind: "every-loci";
        } | {
            kind: "empty-loci";
        } | DataLoci<unknown, unknown> | Shape.Loci | ShapeGroup.Loci | Volume.Loci | Volume.Isosurface.Loci | Volume.Cell.Loci | Volume.Segment.Loci;
    };
    export type Granularity = keyof typeof Granularity;
    export const GranularityOptions: ["model" | "structure" | "residue" | "chain" | "element" | "entity" | "operator" | "elementInstances" | "residueInstances" | "chainInstances", string][];
    /** Exclude `Instances` granularity kinds */
    export function simpleGranularity(granularity: Granularity): "model" | "structure" | "residue" | "chain" | "element" | "entity" | "operator" | "elementInstances" | "residueInstances" | "chainInstances";
    export function applyGranularity(loci: Loci, granularity: Granularity): Loci;
    /**
     * Converts structure related loci to StructureElement.Loci and applies
     * granularity if given
     */
    export function normalize(loci: Loci, granularity?: Granularity, alwaysConvertBonds?: boolean): Loci;
    export {};
}
