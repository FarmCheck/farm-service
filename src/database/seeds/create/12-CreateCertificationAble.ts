import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as faker from 'faker';
import * as uuid from 'uuid';

import {
    Product,
    TargetType,
    Organization,
    Certification,
    Farm,
    CertificationAble
} from '../../../api/models';

export class CreateCertificationAble implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        // The current typeorm-seeding used has bug which is about seeding simple-array
        // This bug was resolved in version 1.0.0
        //
        const farms = await connection.manager.find(Farm, {select: ['id']});
        const products = await connection.manager.find(Product, {select: ['id']});
        const targetTypes = await connection.manager.find(TargetType);
        const organizations = await connection.manager.find(Organization, {select: ['id']});
        const certifications = await connection.manager.find(Certification, {select: ['id']});
        const entities: CertificationAble[] = [];

        const { id: targetTypeFarmID } = targetTypes.find(e => e.name === 'farm');
        await times(farms.length, async (i) => {
            entities.push(
                await this.createNewCertificationAble(connection, organizations, certifications,
                { targetID: farms[i].id, targetTypeID: targetTypeFarmID })
            );
        });

        const { id: targetTypeProductID } = targetTypes.find(e => e.name === 'product');
        await times(products.length, async (i) => {
            entities.push(
                await this.createNewCertificationAble(connection, organizations, certifications,
                { targetID: products[i].id, targetTypeID: targetTypeProductID })
            );
        });

        await connection.manager.save(entities, {
            chunk: 100,
        });
    }

    public async createNewCertificationAble(connection: Connection, organizations: Organization[],
                                            certifications: Certification[], target: any): Promise<CertificationAble> {
        const organization = organizations[faker.random.number(organizations.length - 1)];
        const certification = certifications[faker.random.number(certifications.length - 1)];
        const { targetID, targetTypeID } = target;

        const certificationAble = new CertificationAble();
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
    }
}
