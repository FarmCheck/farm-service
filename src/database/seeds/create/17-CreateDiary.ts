import { Factory, Seed, times } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import * as faker from 'faker';
import * as uuid from 'uuid';

import { Diary, ProductObject, Section, Step } from '../../../api/models';
import { orderBy } from 'lodash';

const DIARY_EACH_STEPS = 10;

export class CreateDiary implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const productObjects = await connection.manager.find(ProductObject, {
            relations: [
                'process', 'process.steps', 'sections',
            ],
        });
        let steps: Step[] = [];
        let sections: Section[] = [];

        let diaryList: Diary[] = [];
        await times(productObjects.length, async (i) => {
            const currentSection = orderBy(
                productObjects[i].sections,
                ['status', 'createdAt'],
                ['asc', 'desc']
            )[0];
            const processSteps = productObjects[i].process.steps;
            sections.push(currentSection); // save to know which sections have changed

            for (const step of processSteps) {
                steps.push(step); // save to know which steps have changed

                await times(DIARY_EACH_STEPS, async () => {
                    const diary = new Diary();
                    diary.id = uuid.v1();
                    diary.stepID = step.id;
                    diary.sectionID = currentSection.id;
                    diary.name = faker.name.findName();
                    diary.description = faker.lorem.sentence();
                    diary.urls = [];
                    diary.createdAt = faker.date.past(1).toISOString();

                    const num = faker.random.number(3);
                    for (let j = 0; j < num; ++j) {
                        diary.urls.push('https://www.vietnam-briefing.com/news/wp-content/uploads/2019/04/VB-mag-image-1.jpg');
                    }

                    // referenced object in the array will change too
                    currentSection.diariesTotal++;
                    step.diariesTotal++;

                    diaryList.push(diary);
                });
            }
            if (diaryList.length > 5000) { // change here lower if it crash because out of memory
                // Save total
                await connection.transaction(async (manager) => {
                    await manager.save(sections, { chunk: 100 });
                    await manager.save(steps, { chunk: 100 });
                    await manager.save(diaryList, { chunk: 100 });
                });
                diaryList = [];
                steps = [];
                sections = [];
            }
        });
    }
}
