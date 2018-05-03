import React from 'react';
import { Button, Icon, View, Text } from 'native-base';
import * as viewModel from './private';

export const Answer: React.StatelessComponent<viewModel.Answer> = (answer: viewModel.Answer): JSX.Element => {
    return <View style={{ padding: 3 }}>
        <Button rounded block>
            <Text>{answer.text}</Text>
            <Icon name='navigate' />
        </Button>
    </View>;
};