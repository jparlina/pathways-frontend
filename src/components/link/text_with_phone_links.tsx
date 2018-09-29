// tslint:disable:no-let readonly-array no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { Text } from 'native-base';
import { Link } from './link';
import { phoneNumberRegex } from '../../application/regular_expressions';

export interface TextWithPhoneLinksProps {
    readonly text: string;
}

export const TextWithPhoneLinks: React.StatelessComponent<TextWithPhoneLinksProps> = (props: TextWithPhoneLinksProps): JSX.Element => {
    const words = props.text.split(' ');
    const lastIndex = words.length - 1;
    const mapWithIndex = R.addIndex(R.map);
    return (
        <Text>
            {
                mapWithIndex((word: string, currentIndex: number): string | JSX.Element => {
                    const wordForSentence = currentIndex === lastIndex ? word : word + ' ';
                    if (phoneNumberRegex.test(word)) {
                        return <Link key={currentIndex} href={'tel:' + word} text={wordForSentence} />;
                    }
                    return wordForSentence;
                }, words)
            }
        </Text>
    );
};