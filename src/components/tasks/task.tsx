import React from 'react';
import { ListItem, Text, Button, Icon, Grid, Col, Row } from 'native-base';
import { taskStyles } from './styles';
import { TaskActions } from './actions';
import * as selector from '../../selectors/tasks';
import * as stores from '../../stores/tasks';
import { SetTaskDetailPageAction } from '../../stores/page_switcher';

export interface Props {
}

export type Actions = TaskActions;

export const Task: React.StatelessComponent<selector.Task & Actions> = (props: selector.Task & Actions): JSX.Element => {
    return (
        <ListItem
            style={props.addToSavedList ? taskStyles.suggestedListItem : taskStyles.savedListItem} button noIndent
            onPress={(): SetTaskDetailPageAction => props.goToTaskDetail(props.id)}>
            <Grid>
                <Row>
                    <Col size={15}>
                        {!props.addToSavedList ?
                            <Button
                                dark
                                transparent
                            >
                                <Icon name='menu' />
                            </Button>
                        :
                            <Button
                                onPress={(): stores.AddToSavedListAction => props.addToSavedList(props.id)}
                                dark
                                transparent
                            >
                                <Icon name='add' />
                            </Button>
                        }
                    </Col>
                    <Col size={70}>
                        <Row>
                            <Text numberOfLines={2}>{props.title}</Text>
                        </Row>
                    </Col>
                    <Col size={15}>
                        <Row style={taskStyles.rightColumn}>
                            <Icon style={taskStyles.icon} name='star-circle' type='MaterialCommunityIcons'/>
                            <Icon style={taskStyles.icon} name='arrow-forward' />
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
};
