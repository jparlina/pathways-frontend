// tslint:disable:no-expression-statement
// tslint:disable:no-let
// tslint:disable:no-any

import * as stores from '../../stores/tasks';
import * as selector from '../tasks';
import * as helpers from '../../stores/__tests__/helpers/tasks_helpers';

describe('tasks selector', () => {

    describe ('denormalization', () => {
        let taskDefinition: helpers.TaskDefinitionBuilder;
        let task: helpers.TaskBuilder;
        let denormalizedTask: selector.Task;

        beforeEach(() => {
            taskDefinition = new helpers.TaskDefinitionBuilder();
            task = new helpers.TaskBuilder(taskDefinition.id);
            denormalizedTask = selector.denormalizeTask(task, taskDefinition);
        });

        test('id property', () => {
            expect(denormalizedTask.id).toBe(task.id);
        });

        test('completed property', () => {
            expect(denormalizedTask.completed).toBe(task.completed);
        });

        test('suggested property', () => {
            expect(denormalizedTask.suggested).toBe(task.suggested);
        });

        test('starred property', () => {
            expect(denormalizedTask.starred).toBe(task.starred);
        });

        test('title property', () => {
            expect(denormalizedTask.title).toBe(taskDefinition.title);
        });

        test('description property', () => {
            expect(denormalizedTask.description).toBe(taskDefinition.description);
        });

        test('category property', () => {
            expect(denormalizedTask.category).toBe(taskDefinition.category);
        });

        test('importance property', () => {
            expect(denormalizedTask.importance).toBe(taskDefinition.importance);
        });

        test('tags property', () => {
            expect(denormalizedTask.tags).toBe(taskDefinition.tags);
        });
    });

    describe('data retreival', ()  => {
        let taskDefinitions: ReadonlyArray<helpers.TaskDefinitionBuilder>;
        let tasks: ReadonlyArray<helpers.TaskBuilder>;
        let suggestedTasks: ReadonlyArray<helpers.TaskBuilder>;
        let store: stores.Store;

        beforeEach(() => {
            const firstTaskDefinition = new helpers.TaskDefinitionBuilder();
            const firstTask = new helpers.TaskBuilder(firstTaskDefinition.id);
            const secondTaskDefinition = new helpers.TaskDefinitionBuilder();
            const secondTask = new helpers.TaskBuilder(secondTaskDefinition.id);
            taskDefinitions = [firstTaskDefinition, secondTaskDefinition];
            tasks = [firstTask, secondTask];
            suggestedTasks = [secondTask];
            store = helpers.buildNormalizedStore(taskDefinitions, tasks, suggestedTasks);
        });

        test('returns all tasks', () => {
            expect(selector.selectTasks(store)).toHaveLength(tasks.length);
        });

        test('returns all suggested tasks', () => {
            expect(selector.selectSuggestedTasks(store)).toHaveLength(suggestedTasks.length);
        });
    });
});
