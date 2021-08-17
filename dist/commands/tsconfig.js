"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonfile = tslib_1.__importStar(require("jsonfile"));
const path = tslib_1.__importStar(require("path"));
const tsconfig = tslib_1.__importStar(require("../tsconfig.json"));
const content = tsconfig;
content.compilerOptions.outDir = '.tmp';
content.include = [
    'src/**/*',
];
const filePath = path.join(process.cwd(), 'tsconfig.build.json');
jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        process.exit(0);
    }
    else {
        console.error('Failed to generate the tsconfig.build.json', err);
        process.exit(1);
    }
});
//# sourceMappingURL=tsconfig.js.map