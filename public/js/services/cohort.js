let _cohortCache = null;

const fetchCohortCached = async () => {
  if (_cohortCache) return _cohortCache;

  _cohortCache = await fetchAllCohortRecipes();
  return _cohortCache;
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      message: data.error || 'Server error',
    };
  }
  return res.json();
};

const parseIngredients = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const fetchAllCohortRecipes = async () => {
  const res = await fetch('/api/cohort');
  return handleResponse(res);
};

export const fetchCohortRecipeById = async (id) => {
  const res = await fetch(`/api/cohort/${id}`);
  const raw = await handleResponse(res);

  return {
    ...raw,
    ingredients: parseIngredients(raw.ingredients),
  };
};

export const fetchCohortByArea = async (area) => {
  const res = await fetch(`/api/cohort/area/${area}`);
  return handleResponse(res);
};

export const fetchCohortByTitle = async (title) => {
  const res = await fetch(`/api/cohort/title/${title}`);
  return handleResponse(res);
};

export const fetchCohortByAdded = async (name) => {
  const res = await fetch(`/api/cohort/added_by/${name}`);
  return handleResponse(res);
};

export const getDishNameOptionsCohort = async () => {
  const recipes = await fetchCohortCached();
  const options = [...new Set(recipes.map((recipe) => recipe.title).sort())];
  return options;
};

export const getAddedByOptionsCohort = async () => {
  const recipes = await fetchCohortCached();
  const options = [...new Set(recipes.map((recipe) => recipe.added_by).sort())];

  return options;
};

export const getCountryOptionsCohort = async () => {
  const recipes = await fetchCohortCached();

  const options = [...new Set(recipes.map((recipe) => recipe.area).sort())];
  return options;
};
