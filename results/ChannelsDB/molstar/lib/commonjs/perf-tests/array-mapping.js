"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const B = tslib_1.__importStar(require("benchmark"));
const symmetry_operator_1 = require("../mol-math/geometry/symmetry-operator");
const mat4_1 = require("../mol-math/linear-algebra/3d/mat4");
const vec3_1 = require("../mol-math/linear-algebra/3d/vec3");
function _createMapping(operator, coords, radius) {
    const invariantPosition = createCoordinateMapper(symmetry_operator_1.SymmetryOperator.Default, coords);
    const position = operator.isIdentity ? invariantPosition : createCoordinateMapper(operator, coords);
    const { x, y, z } = createProjections(operator, coords);
    return { operator, coordinates: coords, invariantPosition, position, x, y, z, r: radius };
}
function createMapping(operator, coords, radius = _zeroRadius) {
    return _createMapping(operator, coords, radius);
}
function createCoordinateMapper(t, coords) {
    if (t.isIdentity)
        return identityPosition(coords);
    return generalPosition(t, coords);
}
function _zeroRadius(i) { return 0; }
function createProjections(t, coords) {
    if (t.isIdentity)
        return { x: projectCoord(coords.x), y: projectCoord(coords.y), z: projectCoord(coords.z) };
    return { x: projectX(t, coords), y: projectY(t, coords), z: projectZ(t, coords) };
}
function projectCoord(xs) {
    return function projectCoord(i) {
        return xs[i];
    };
}
function isW1(m) {
    return m[3] === 0 && m[7] === 0 && m[11] === 0 && m[15] === 1;
}
function projectX({ matrix: m }, { x: xs, y: ys, z: zs }) {
    const xx = m[0], yy = m[4], zz = m[8], tx = m[12];
    if (isW1(m)) {
        // this should always be the case.
        return function projectX_W1(i) {
            return xx * xs[i] + yy * ys[i] + zz * zs[i] + tx;
        };
    }
    return function projectX(i) {
        const x = xs[i], y = ys[i], z = zs[i], w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1.0;
        return (xx * x + yy * y + zz * z + tx) / w;
    };
}
function projectY({ matrix: m }, { x: xs, y: ys, z: zs }) {
    const xx = m[1], yy = m[5], zz = m[9], ty = m[13];
    if (isW1(m)) {
        // this should always be the case.
        return function projectY_W1(i) {
            return xx * xs[i] + yy * ys[i] + zz * zs[i] + ty;
        };
    }
    return function projectY(i) {
        const x = xs[i], y = ys[i], z = zs[i], w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1.0;
        return (xx * x + yy * y + zz * z + ty) / w;
    };
}
function projectZ({ matrix: m }, { x: xs, y: ys, z: zs }) {
    const xx = m[2], yy = m[6], zz = m[10], tz = m[14];
    if (isW1(m)) {
        // this should always be the case.
        return function projectZ_W1(i) {
            return xx * xs[i] + yy * ys[i] + zz * zs[i] + tz;
        };
    }
    return function projectZ(i) {
        const x = xs[i], y = ys[i], z = zs[i], w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1.0;
        return (xx * x + yy * y + zz * z + tz) / w;
    };
}
function identityPosition({ x, y, z }) {
    return function identityPosition(i, s) {
        s[0] = x[i];
        s[1] = y[i];
        s[2] = z[i];
        return s;
    };
}
function generalPosition({ matrix: m }, { x: xs, y: ys, z: zs }) {
    if (isW1(m)) {
        // this should always be the case.
        return function generalPosition_W1(i, r) {
            const x = xs[i], y = ys[i], z = zs[i];
            r[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            r[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            r[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
            return r;
        };
    }
    return function generalPosition(i, r) {
        r[0] = xs[i];
        r[1] = ys[i];
        r[2] = zs[i];
        vec3_1.Vec3.transformMat4(r, r, m);
        return r;
    };
}
//
function getData(size, m) {
    const op = symmetry_operator_1.SymmetryOperator.create('op', m);
    const coords = {
        x: new Float32Array(size),
        y: new Float32Array(size),
        z: new Float32Array(size),
    };
    return { op, coords };
}
function getArrayMappingClass(op, coords) {
    return symmetry_operator_1.SymmetryOperator.createMapping(op, coords);
}
function getArrayMappingClosures(op, coords) {
    return createMapping(op, coords);
}
function testXYZ(mapping) {
    const n = mapping.coordinates.x.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += mapping.x(i);
        sum += mapping.y(i);
        sum += mapping.z(i);
    }
    return sum /= n;
}
function testPos(mapping) {
    const n = mapping.coordinates.x.length;
    let sum = 0;
    const p = (0, vec3_1.Vec3)();
    for (let i = 0; i < n; i++) {
        mapping.position(i, p);
        sum += p[0];
        sum += p[1];
        sum += p[2];
    }
    return sum /= n;
}
function testInvPos(mapping) {
    const n = mapping.coordinates.x.length;
    let sum = 0;
    const p = (0, vec3_1.Vec3)();
    for (let i = 0; i < n; i++) {
        mapping.invariantPosition(i, p);
        sum += p[0];
        sum += p[1];
        sum += p[2];
    }
    return sum /= n;
}
function run(size, variant) {
    const suite = new B.Suite();
    const m = mat4_1.Mat4.identity();
    if (variant === 'w1') {
        mat4_1.Mat4.setTranslation(m, vec3_1.Vec3.create(1, 1, 1));
    }
    const { op, coords } = getData(size, m);
    const mappingClass = getArrayMappingClass(op, coords);
    const mappingClosures = getArrayMappingClosures(op, coords);
    suite
        .add('class testXYZ', () => testXYZ(mappingClass))
        .add('class testPos', () => testPos(mappingClass))
        .add('class testInvPos', () => testInvPos(mappingClass))
        .add('closures testXYZ', () => testXYZ(mappingClosures))
        .add('closures testPos', () => testPos(mappingClosures))
        .add('closures testInvPos', () => testInvPos(mappingClosures))
        .on('cycle', (e) => {
        console.log(size, variant, String(e.target));
    })
        .run();
}
run(10000, 'identity');
run(100000, 'identity');
run(1000000, 'identity');
run(10000, 'w1');
run(100000, 'w1');
run(1000000, 'w1');
// 10000 identity class testXYZ x 59,722 ops/sec ±0.20% (97 runs sampled)
// 10000 identity class testPos x 59,060 ops/sec ±0.13% (99 runs sampled)
// 10000 identity class testInvPos x 59,138 ops/sec ±0.16% (98 runs sampled)
// 10000 identity closures testXYZ x 8,425 ops/sec ±7.19% (92 runs sampled)
// 10000 identity closures testPos x 37,082 ops/sec ±11.28% (97 runs sampled)
// 10000 identity closures testInvPos x 36,770 ops/sec ±11.51% (92 runs sampled)
// 100000 identity class testXYZ x 759 ops/sec ±0.27% (96 runs sampled)
// 100000 identity class testPos x 1,845 ops/sec ±0.28% (100 runs sampled)
// 100000 identity class testInvPos x 1,853 ops/sec ±0.14% (98 runs sampled)
// 100000 identity closures testXYZ x 750 ops/sec ±0.16% (96 runs sampled)
// 100000 identity closures testPos x 1,675 ops/sec ±0.36% (98 runs sampled)
// 100000 identity closures testInvPos x 1,683 ops/sec ±0.28% (96 runs sampled)
// 1000000 identity class testXYZ x 75.04 ops/sec ±0.31% (78 runs sampled)
// 1000000 identity class testPos x 184 ops/sec ±0.22% (87 runs sampled)
// 1000000 identity class testInvPos x 185 ops/sec ±0.38% (87 runs sampled)
// 1000000 identity closures testXYZ x 72.23 ops/sec ±0.22% (76 runs sampled)
// 1000000 identity closures testPos x 165 ops/sec ±1.96% (86 runs sampled)
// 1000000 identity closures testInvPos x 167 ops/sec ±0.26% (86 runs sampled)
// 10000 w1 class testXYZ x 6,084 ops/sec ±0.17% (101 runs sampled)
// 10000 w1 class testPos x 12,190 ops/sec ±0.60% (95 runs sampled)
// 10000 w1 class testInvPos x 17,345 ops/sec ±0.33% (100 runs sampled)
// 10000 w1 closures testXYZ x 7,327 ops/sec ±0.40% (98 runs sampled)
// 10000 w1 closures testPos x 15,059 ops/sec ±0.29% (100 runs sampled)
// 10000 w1 closures testInvPos x 16,798 ops/sec ±0.33% (101 runs sampled)
// 100000 w1 class testXYZ x 601 ops/sec ±0.43% (94 runs sampled)
// 100000 w1 class testPos x 1,209 ops/sec ±0.22% (93 runs sampled)
// 100000 w1 class testInvPos x 1,755 ops/sec ±0.17% (97 runs sampled)
// 100000 w1 closures testXYZ x 486 ops/sec ±0.18% (96 runs sampled)
// 100000 w1 closures testPos x 1,286 ops/sec ±0.29% (98 runs sampled)
// 100000 w1 closures testInvPos x 1,692 ops/sec ±0.14% (96 runs sampled)
// 1000000 w1 class testXYZ x 57.38 ops/sec ±0.87% (69 runs sampled)
// 1000000 w1 class testPos x 130 ops/sec ±0.18% (84 runs sampled)
// 1000000 w1 class testInvPos x 163 ops/sec ±0.36% (84 runs sampled)
// 1000000 w1 closures testXYZ x 48.55 ops/sec ±0.25% (64 runs sampled)
// 1000000 w1 closures testPos x 129 ops/sec ±0.51% (84 runs sampled)
// 1000000 w1 closures testInvPos x 169 ops/sec ±0.23% (87 runs sampled)
