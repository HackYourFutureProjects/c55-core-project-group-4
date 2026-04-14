import { selectsCohortArray } from '../features/renderRecipeList.js';
import {
  fetchCohortByAdded,
  fetchCohortByArea,
  fetchCohortByTitle,
} from '../services/cohort.js';
import { initFilters } from './handlerFiltersMealDB.js';

export const initCohortDishNameFilter = () => {
  initFilters(
    '#cohort-title-select',
    fetchCohortByTitle,
    '.cohort-list',
    selectsCohortArray,
    'cohort'
  );
};

export const initCohortAddedByFilter = () => {
  initFilters(
    '#cohort-added-select',
    fetchCohortByAdded,
    '.cohort-list',
    selectsCohortArray,
    'cohort'
  );
};

export const initCohortCountryFilter = () => {
  initFilters(
    '#cohort-country-select',
    fetchCohortByArea,
    '.cohort-list',
    selectsCohortArray,
    'cohort'
  );
};
