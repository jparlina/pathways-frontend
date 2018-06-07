import React from 'react';
import { Content, Text } from 'native-base';
import * as store from '../../stores/page_switcher';
import * as exploreAll from '../explore_all/explore_all';
import * as questionnaire from '../questionnaire';
import * as myPlan from '../my_plan/my_plan';
import { Store as TasksStore } from '../../stores/tasks';
import { TaskDetail } from '../tasks/task_detail';
import { selectTaskById } from '../../selectors/tasks';

export interface Props {
    readonly currentPageInProps: store.Page;
    readonly currentPageParameters: store.PageParameters;
    readonly tasksStore: TasksStore;
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    switch (props.currentPageInProps) {
        case store.Page.Questionnaire:
            return <questionnaire.ConnectedComponent />;

        case store.Page.MyPlan:
            return <myPlan.Component />;

        case store.Page.ExploreAll:
            return <exploreAll.Component />;

        case store.Page.TaskDetail:
            return <TaskDetail task={selectTaskById(props.tasksStore, props.currentPageParameters.taskId)} />;

        default:
            return <Content><Text>Error</Text></Content>;
    }
};
