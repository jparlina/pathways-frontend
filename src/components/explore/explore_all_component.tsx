import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Content, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { colors, values, textStyles, applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';
import { getColorForExploreIcon } from './get_color_for_explore_icon';
import { mapWithIndex } from '../../application/map_with_index';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

type AllExploreProps = ExploreAllProps & RouterProps;

export const ExploreAllComponent: React.StatelessComponent<AllExploreProps> =
    (props: AllExploreProps): JSX.Element => (
        <Content padder style={applicationStyles.body}>
            <Text style={textStyles.headlineH1StyleBlackLeft}>
                <Trans>Learn</Trans>
            </Text>
            <Text style={textStyles.headlineH4StyleBlackLeft}>
                <Trans>Find out about my community and available services.</Trans>
            </Text>
            <View style={styles.buttonsWrapper}>
                {mapWithIndex((section: ExploreSection, index: number) => (
                    buildButton(
                        getLearnButtonContent(section),
                        goToRouteWithParameter(Routes.LearnDetail, section.id, props.history),
                        index,
                    )
                ), props.sections)}
            </View>
        </Content>
    );

const buildButton = (buttonContent: JSX.Element, buttonOnPress: () => void, index: number): JSX.Element => (
    <TouchableOpacity onPress={buttonOnPress} style={[applicationStyles.boxShadowBelow, styles.button]} key={index}>
        {buttonContent}
    </TouchableOpacity>
);

const getLearnButtonContent = (section: ExploreSection): JSX.Element => (
    <View>
        <Icon
            type='FontAwesome'
            name={section.icon}
            style={[
                styles.buttonContentIcon,
                {
                    color: getColorForExploreIcon(section.icon),
                },
            ]}
        />
        <Text style={textStyles.headlineH2StyleBlackLeft}>{section.name}</Text>
        <Text style={textStyles.paragraphStyle}>{section.description}</Text>
    </View>
);

const styles = StyleSheet.create({
    button: {
        justifyContent: 'space-between',
        width: '48%',
        backgroundColor: colors.white,
        borderRadius: values.lessRoundedBorderRadius,
        marginTop: 10,
        padding: 15,
    },
    buttonContentIcon: {
        color: colors.topaz,
        fontSize: values.smallIconSize,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
});