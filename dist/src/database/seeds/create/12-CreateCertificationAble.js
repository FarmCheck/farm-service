"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCertificationAble = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const faker = tslib_1.__importStar(require("faker"));
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../../api/models");
class CreateCertificationAble {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // The current typeorm-seeding used has bug which is about seeding simple-array
            // This bug was resolved in version 1.0.0
            //
            const farms = yield connection.manager.find(models_1.Farm, { select: ['id'] });
            const products = yield connection.manager.find(models_1.Product, { select: ['id'] });
            const targetTypes = yield connection.manager.find(models_1.TargetType);
            const organizations = yield connection.manager.find(models_1.Organization, { select: ['id'] });
            const certifications = yield connection.manager.find(models_1.Certification, { select: ['id'] });
            const entities = [];
            const { id: targetTypeFarmID } = targetTypes.find(e => e.name === 'farm');
            yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                entities.push(yield this.createNewCertificationAble(connection, organizations, certifications, { targetID: farms[i].id, targetTypeID: targetTypeFarmID }));
            }));
            const { id: targetTypeProductID } = targetTypes.find(e => e.name === 'product');
            yield typeorm_seeding_1.times(products.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                entities.push(yield this.createNewCertificationAble(connection, organizations, certifications, { targetID: products[i].id, targetTypeID: targetTypeProductID }));
            }));
            yield connection.manager.save(entities, {
                chunk: 100,
            });
        });
    }
    createNewCertificationAble(connection, organizations, certifications, target) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const organization = organizations[faker.random.number(organizations.length - 1)];
            const certification = certifications[faker.random.number(certifications.length - 1)];
            const { targetID, targetTypeID } = target;
            const certificationAble = new models_1.CertificationAble();
            certificationAble.id = uuid.v1();
            certificationAble.targetID = targetID;
            certificationAble.targetTypeID = targetTypeID;
            certificationAble.organizationID = organization.id;
            certificationAble.certificationID = certification.id;
            certificationAble.description = faker.lorem.sentence();
            certificationAble.urls = [];
            const len = faker.random.number(5);
            for (let i = 0; i < len; ++i) {
                certificationAble.urls.push('https://www.vietnam-briefing.com/news/wp-content/uploads/2019/04/VB-mag-image-1.jpg');
            }
            // await connection.manager.save(certificationAble);
            return certificationAble;
        });
    }
}
exports.CreateCertificationAble = CreateCertificationAble;
//# sourceMappingURL=12-CreateCertificationAble.js.map