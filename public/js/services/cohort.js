export const fetchAllCohortRecipes = async () => {
  const res = await fetch('/api/cohort');
  return res.json();
};

export const fetchCohortRecipeById = async (id) => {
  const res = await fetch(`/api/cohort/${id}`);
  const raw = await res.json();

  const ingredients = (() => {
    try {
      return JSON.parse(raw.ingredients);
    } catch {
      return [];
    }
  })();

  return {
    ...raw,
    ingredients,
  };
};

export const fetchCohortByArea = async (area) => {
  const res = await fetch(`/api/cohort/area/${area}`);
  return res.json();
};

export const fetchCohortByTitle = async (title) => {
  const res = await fetch(`/api/cohort/title/${title}`);
  return res.json();
};

export const fetchCohortByAdded = async (name) => {
  const res = await fetch(`/api/cohort/added_by/${name}`);
  return res.json();
};

export const getDishNameOptionsCohort = async () => {
  const recipes = await fetchAllCohortRecipes();
  // Using Set to remove duplicate values. Set is a built‑in JS structure. That automatically keeps only unique items
  const options = [...new Set(recipes.map((recipe) => recipe.title).sort())];
  return options;
};

export const getAddedByOptionsCohort = async () => {
  const recipes = await fetchAllCohortRecipes();
  const options = [...new Set(recipes.map((recipe) => recipe.added_by).sort())];

  return options;
};

export const getCountryOptionsCohort = async () => {
  const recipes = await fetchAllCohortRecipes();

  const options = [...new Set(recipes.map((recipe) => recipe.area).sort())];
  return options;
};
