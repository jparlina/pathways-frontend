import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './topic_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickTasks } from './pick_tasks';

export const selectCompletedTasks = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTaskListItem(appStore), R.keys(R.pickBy(R.prop('completed'), pickTasks(appStore))))
);
