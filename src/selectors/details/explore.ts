import * as select from '../explore/types';
import * as stores from '../../stores/explore';
import { Taxonomy } from '../../stores/taxonomies';
import { Locale, selectLocalizedText } from '../locale';
import { selectIconFromExploreTaxonomy } from '../select_icon_from_explore_taxonomy';
import * as R from 'ramda';

export const denormalizeSections =
    (locale: Locale, sections: stores.ExploreSectionMap, exploreTaxonomy: Taxonomy): ReadonlyArray<select.ExploreSection> => {

        const buildOneSectionForView = (id: string): select.ExploreSection => {
            const theSection = sections[id];
            const name = selectLocalizedText(locale, theSection.name);
            const introduction = selectLocalizedText(locale, theSection.introduction);
            const icon = selectIconFromExploreTaxonomy(theSection.taxonomyTerms, exploreTaxonomy);

            return { id, name, introduction, icon };
        };

        return R.map(buildOneSectionForView, R.keys(sections));
    };

export const buildExploreSection = (locale: Locale, theSection: stores.ExploreSection, icon: string): select.ExploreSection => {
    const id = theSection.id;
    const name = selectLocalizedText(locale, theSection.name);
    const introduction = selectLocalizedText(locale, theSection.introduction);

    return { id, name, introduction, icon };
};
