"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiary = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const faker = tslib_1.__importStar(require("faker"));
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../../api/models");
const lodash_1 = require("lodash");
const DIARY_EACH_STEPS = 10;
class CreateDiary {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productObjects = yield connection.manager.find(models_1.ProductObject, {
                relations: [
                    'process', 'process.steps', 'sections',
                ],
            });
            let steps = [];
            let sections = [];
            let diaryList = [];
            yield typeorm_seeding_1.times(productObjects.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const currentSection = lodash_1.orderBy(productObjects[i].sections, ['status', 'createdAt'], ['asc', 'desc'])[0];
                const processSteps = productObjects[i].process.steps;
                sections.push(currentSection); // save to know which sections have changed
                for (const step of processSteps) {
                    steps.push(step); // save to know which steps have changed
                    yield typeorm_seeding_1.times(DIARY_EACH_STEPS, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const diary = new models_1.Diary();
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
                    }));
                }
                if (diaryList.length > 5000) { // change here lower if it crash because out of memory
                    // Save total
                    yield connection.transaction((manager) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        yield manager.save(sections, { chunk: 100 });
                        yield manager.save(steps, { chunk: 100 });
                        yield manager.save(diaryList, { chunk: 100 });
                    }));
                    diaryList = [];
                    steps = [];
                    sections = [];
                }
            }));
        });
    }
}
exports.CreateDiary = CreateDiary;
//# sourceMappingURL=17-CreateDiary.js.map