/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
import * as fs from 'fs';
import { parseXtc } from '../mol-io/reader/xtc/parser';
console.log('reading');
console.time('read');
fs.readFile('C:\\Projects\\mol-star\\molstar\\build\\tests\\test.xtc', async (err, data) => {
    var _a, _b;
    console.log(err);
    console.timeEnd('read');
    console.time('parse');
    const ret = await parseXtc(new Uint8Array(data)).run(o => {
        console.log(`${o.root.progress.current}/${o.root.progress.max}`);
    }, 1000);
    console.timeEnd('parse');
    if (ret.isError) {
        console.log(ret.message);
    }
    else {
        console.log((_a = ret.result) === null || _a === void 0 ? void 0 : _a.frames.length);
        console.log((_b = ret.result) === null || _b === void 0 ? void 0 : _b.frames[0].x[250]);
    }
});
