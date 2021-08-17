"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductObject = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
class CreateProductObject {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield connection.manager.find(models_1.Product, {
                relations: [
                    'farm', 'farm.areas', 'farm.processes',
                ],
            });
            const areas = yield connection.manager.find(models_1.Area, { select: ['id', 'productObjectsTotal'] });
            const processes = yield connection.manager.find(models_1.Process, { select: ['id', 'productObjectsTotal'] });
            const productObjects = [];
            const seq = {};
            const seqArea = {};
            const seqProduct = {};
            const seqProcess = {};
            yield typeorm_seeding_1.times(products.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // TODO: can change random range to reduce amount record
                // max amount can be up to 142,400 record product
                // (category x area x randomNum = 712 x 10 x 20)
                const amount = faker.random.number(10);
                for (let j = 0; j < amount; ++j) {
                    const process = products[i].farm.processes[faker.random
                        .number(products[i].farm.processes.length - 1)];
                    const name = faker.commerce.productAdjective();
                    const prefixCode = products[i].code;
                    let indexCode = 1;
                    if (seq.hasOwnProperty(prefixCode)) {
                        indexCode = ++seq[prefixCode];
                    }
                    else {
                        seq[prefixCode] = indexCode;
                    }
                    const productObject = yield factory(models_1.ProductObject)({
                        productID: products[i].id,
                        processID: process.id,
                        areaID: products[i].farm.areas[0].id,
                        code: `${prefixCode}-${indexCode.toString().padStart(5, '0')}`,
                        name,
                    }).make();
                    productObjects.push(productObject);
                    if (seqArea[productObject.areaID]) {
                        seqArea[productObject.areaID]++;
                    }
                    else {
                        seqArea[productObject.areaID] = 1;
                    }
                    if (seqProduct[productObject.productID]) {
                        seqProduct[productObject.productID]++;
                    }
                    else {
                        seqProduct[productObject.productID] = 1;
                    }
                    if (seqProcess[productObject.processID]) {
                        seqProcess[productObject.processID]++;
                    }
                    else {
                        seqProcess[productObject.processID] = 1;
                    }
                }
            }));
            for (const area of areas) {
                if (seqArea[area.id]) {
                    area.productObjectsTotal = seqArea[area.id];
                }
            }
            for (const product of products) {
                if (seqProduct[product.id]) {
                    product.productObjectsTotal = seqProduct[product.id];
                }
            }
            for (const process of processes) {
                if (seqProcess[process.id]) {
                    process.productObjectsTotal = seqProcess[process.id];
                }
            }
            yield connection.transaction((manager) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield manager.save(productObjects, { chunk: 100 });
                yield manager.save(areas, { chunk: 100 });
                yield manager.save(products, { chunk: 100 });
                yield manager.save(processes, { chunk: 100 });
            }));
        });
    }
}
exports.CreateProductObject = CreateProductObject;
//# sourceMappingURL=15-CreateProductObject.js.map