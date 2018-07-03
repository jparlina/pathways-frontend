import React from 'react';
import { ListItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { Id } from '../../stores/articles';
import { SetArticleDetailPageAction } from '../../stores/page_switcher';
import { ArticleListItem } from '../../selectors/articles';

export interface ArticleListItemActions {
    readonly goToArticleDetail: (articleId: Id) => SetArticleDetailPageAction;
}
type AllArticleListItemProps = ArticleListItemActions & ArticleListItem;

export const ArticleListItemComponent: React.StatelessComponent<AllArticleListItemProps> =
    (props: AllArticleListItemProps): JSX.Element => (
        <ListItem noIndent noBorder button onPress={(): SetArticleDetailPageAction => props.goToArticleDetail(props.id)}>
            <Grid>
                <Row>
                    <Col size={20}>
                        <Text>[image]</Text>
                    </Col>
                    <Col size={80}>
                        <Row>
                            <Text style={applicationStyles.bold}>{props.title}</Text>
                         </Row>
                        <Row>
                            <Text numberOfLines={1} note>{props.description}</Text>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
