import {
  getAddedByOptionsCohort,
  getCountryOptionsCohort,
  getDishNameOptionsCohort,
} from '../services/cohort.js';
import { renderSelectOptions } from './renderDropdowns.js';

export const renderByDishNameCohort = async () => {
  await renderSelectOptions(
    getDishNameOptionsCohort,
    '#cohort-title-select',
    'a dish name'
  );
};

export const renderAddedByCohort = async () => {
  await renderSelectOptions(
    getAddedByOptionsCohort,
    '#cohort-added-select',
    'an author'
  );
};

export const renderCountryCohort = async () => {
  await renderSelectOptions(
    getCountryOptionsCohort,
    '#cohort-country-select',
    'a country'
  );
};
