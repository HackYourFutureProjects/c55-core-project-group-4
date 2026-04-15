import {
  getAddedByOptionsCohort,
  getCountryOptionsCohort,
  getDishNameOptionsCohort,
} from '../services/cohort.js';
import { renderSelectOptions } from './renderDropdowns.js';

export const renderByDishNameCohort = async () => {
  renderSelectOptions(
    getDishNameOptionsCohort,
    '#cohort-title-select',
    'a dish name'
  );
};

export const renderAddedByCohort = async () => {
  renderSelectOptions(
    getAddedByOptionsCohort,
    '#cohort-added-select',
    'by who added'
  );
};

export const renderCountryCohort = async () => {
  renderSelectOptions(
    getCountryOptionsCohort,
    '#cohort-country-select',
    'a country'
  );
};
