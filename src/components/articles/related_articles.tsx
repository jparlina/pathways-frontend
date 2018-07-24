import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { ArticleListItem } from '../../selectors/articles';
import { ArticleListComponent } from '../articles/article_list';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';

interface RelatedArticlesProps {
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
}
type AllRelatedArticlesProps = RelatedArticlesProps & RouterProps;

export const RelatedArticlesComponent: React.StatelessComponent<AllRelatedArticlesProps> = (props: AllRelatedArticlesProps): JSX.Element => {
    if (props.relatedArticles.length === 0) {
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    return (
        <View>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>LEARN MORE</Trans></Text>
            <ArticleListComponent
                {...props}
                articles={props.relatedArticles} />
        </View>
    );
};