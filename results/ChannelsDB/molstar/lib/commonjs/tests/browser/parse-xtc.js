"use strict";
/**
 * Copyright (c) 2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../mol-io/reader/xtc/parser");
require("./index.html");
const parent = document.getElementById('app');
const btn = document.createElement('button');
btn.innerText = 'run';
btn.onclick = run;
parent.appendChild(btn);
async function run() {
    const req = await fetch('test.xtc');
    const data = await req.arrayBuffer();
    console.log(data.byteLength);
    console.time('parse');
    const ret = await (0, parser_1.parseXtc)(new Uint8Array(data)).run(o => {
        console.log(o.root.progress.current, o.root.progress.max);
    }, 1000);
    console.timeEnd('parse');
    console.log(ret);
    btn.innerText = 'done';
}
