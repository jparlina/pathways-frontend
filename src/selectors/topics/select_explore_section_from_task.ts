import { Store } from '../../stores';
import * as store from '../../stores/topics';
import * as taskDetails from '../explore/find_explore_section_by';
import { ExploreSection } from '../explore/types';
import { selectIconFromExploreTaxonomy } from '../explore/select_icon_from_explore_taxonomy';
import { buildExploreSection } from '../explore/build_explore_section';
import { selectLocale } from '../locale/select_locale';
import { pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';

export const selectExploreSectionFromTask = (appStore: Store, topic: store.Topic): ExploreSection => {
    const storeExploreSection = taskDetails.findExploreSectionBy(topic, appStore.exploreSectionsInStore.sections);
    const exploreTaxonomy = pullExploreTaxonomy(appStore);
    const icon = selectIconFromExploreTaxonomy(storeExploreSection.taxonomyTerms, exploreTaxonomy);
    const locale = selectLocale(appStore);

    return buildExploreSection(locale, storeExploreSection, icon);
};
