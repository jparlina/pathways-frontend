// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { Service } from '../../stores/services';
import {
    ValidSelectorTopicServices,
    ErrorSelectorTopicServices,
    SelectorTopicServices,
    LoadingSelectorTopicServices,
} from '../../selectors/services/types';
import { isValidSelectorTopicServices } from '../../selectors/services/is_valid_selector_task_services';
import { Topic } from '../../selectors/topics/topic';
import { ServiceListItemComponent } from './service_list_item_component';
import { SendTopicServicesRequestAction } from '../../stores/services';
import { textStyles, colors, values } from '../../application/styles';
import { EmptyListComponent } from '../empty_component/empty_list_component';
import { ServiceListErrorComponent } from './service_list_error_component';
import { isErrorSelectorTaskServices } from '../../selectors/services/is_error_selector_task_services';
import * as constants from '../../application/constants';

export interface ServiceListProps {
    readonly topic: Topic;
    readonly taskServicesOrError: SelectorTopicServices;
}

export interface ServiceListActions {
    readonly requestUpdateOfServicesForTask: (topic: Topic) => SendTopicServicesRequestAction;
}

export interface TaskServiceUpdater {
    readonly requestUpdateTaskServices: () => SendTopicServicesRequestAction;
}

type Props = ServiceListProps & ServiceListActions & TaskServiceUpdater;

interface ServiceItemInfo extends ListRenderItemInfo<Service> { }

export class ServiceListComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this.renderServiceListItem = this.renderServiceListItem.bind(this);
    }

    componentDidMount(): void {
        this.props.requestUpdateTaskServices();
    }

    render(): JSX.Element {
        if (isValidSelectorTopicServices(this.props.taskServicesOrError)) {
            return this.renderServiceList(this.props.taskServicesOrError);
        }
        if (isErrorSelectorTaskServices(this.props.taskServicesOrError)) {
            return this.renderServiceListError(this.props.taskServicesOrError);
        }
        return this.renderServiceList(this.props.taskServicesOrError);
    }

    renderServiceList(selectorTaskServices: ValidSelectorTopicServices | LoadingSelectorTopicServices): JSX.Element {
        const services = selectorTaskServices.type === constants.TOPIC_SERVICES_VALID ? selectorTaskServices.services : [];
        return (
            <FlatList
                style={{ backgroundColor: colors.lightGrey }}
                refreshing={this.props.taskServicesOrError.type === constants.TOPIC_SERVICES_LOADING}
                onRefresh={this.props.requestUpdateTaskServices}
                data={services}
                keyExtractor={(service: Service): string => service.id}
                renderItem={this.renderServiceListItem}
                ListEmptyComponent={ServiceListEmpty}
                ListHeaderComponent={< ServiceListHeaderComponent {...this.props} />}
            />
        );
    }

    renderServiceListItem({ item }: ServiceItemInfo): JSX.Element {
        return (
            <ServiceListItemComponent service={item} />
        );
    }

    renderServiceListError(selectorTaskServicesError: ErrorSelectorTopicServices): JSX.Element {
        return (
            <ServiceListErrorComponent error={selectorTaskServicesError} />
        );
    }
}

const ServiceListHeaderComponent = (props: Props): JSX.Element => (
    <View style={{
        backgroundColor: colors.teal,
        marginHorizontal: -10,
        marginTop: -10,
        padding: 20,
    }}
    >
        <Icon
            type={'FontAwesome'}
            name={'map-marker'}
            style={{
                color: colors.white,
                padding: 5,
                fontSize: values.smallIconSize,
            }}
        />
        <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.white }]}>
            <Trans>FIND A SERVICE NEAR YOU</Trans>
        </Text>
        <Text style={textStyles.headlineH2StyleWhiteLeft}>
            {props.topic.title}
        </Text>
    </View>
);

function ServiceListEmpty(): JSX.Element {
    return <EmptyListComponent message={<Trans>No related services found</Trans>} />;
}
