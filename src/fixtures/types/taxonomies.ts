// Examples are Health, Education
export interface TaxonomyTerm {
    readonly icon?: string;
}

// Examples are AIRS, BC211
export interface Taxonomy {
    readonly [taxonomyTermId: string]: TaxonomyTerm;
}

export interface TaxonomyMap {
    readonly [taxonomyId: string]: Taxonomy;
}

export interface TaxonomyStore {
    readonly taxonomyMap: TaxonomyMap;
}

export interface TaxonomyTermReference {
    readonly taxonomyId: string;
    readonly taxonomyTermId: string;
}

export const ExploreTaxonomyId = 'explore';
