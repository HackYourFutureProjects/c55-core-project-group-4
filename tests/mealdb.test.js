import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  searchMealsByName,
  getRandomMeal,
  getCategories,
  getAreas,
  getIngredients,
  filterMealsByCategory,
  filterMealsByArea,
  filterMealsByIngredient,
  getMealById,
} from '../public/js/services/mealdb.js';

describe('mealdb service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function mockFetchResponse(data, ok = true, status = 200) {
    fetch.mockResolvedValue({
      ok,
      status,
      json: async () => data,
    });
  }

  describe('searchMealsByName', () => {
    it('returns empty array when name is empty', async () => {
      const result = await searchMealsByName('');

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches meals by name and normalizes full meal data', async () => {
      mockFetchResponse({
        meals: [
          {
            idMeal: '52772',
            strMeal: 'Teriyaki Chicken Casserole',
            strCategory: 'Chicken',
            strArea: 'Japanese',
            strMealThumb: 'image.jpg',
            strInstructions: 'Cook it well',
            strTags: 'Meat,Casserole',
            strYoutube: 'youtube-link',
            strIngredient1: 'Chicken',
            strMeasure1: '500g',
            strIngredient2: 'Soy Sauce',
            strMeasure2: '2 tbsp',
            strIngredient3: '',
            strMeasure3: '',
          },
        ],
      });

      const result = await searchMealsByName('chicken');

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
      );

      expect(result).toEqual([
        {
          id: '52772',
          title: 'Teriyaki Chicken Casserole',
          category: 'Chicken',
          area: 'Japanese',
          image: 'image.jpg',
          instructions: 'Cook it well',
          tags: ['Meat', 'Casserole'],
          youtube: 'youtube-link',
          ingredients: [
            { ingredient: 'Chicken', measure: '500g' },
            { ingredient: 'Soy Sauce', measure: '2 tbsp' },
          ],
        },
      ]);
    });

    it('returns empty array when API returns no meals', async () => {
      mockFetchResponse({ meals: null });

      const result = await searchMealsByName('unknown');

      expect(result).toEqual([]);
    });

    it('throws error when response is not ok', async () => {
      fetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(searchMealsByName('chicken')).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });
  });

  describe('getRandomMeal', () => {
    it('returns a normalized random meal', async () => {
      mockFetchResponse({
        meals: [
          {
            idMeal: '12345',
            strMeal: 'Random Meal',
            strCategory: 'Beef',
            strArea: 'American',
            strMealThumb: 'random.jpg',
            strInstructions: 'Random instructions',
            strTags: 'Dinner,Easy',
            strYoutube: 'random-video',
            strIngredient1: 'Beef',
            strMeasure1: '1kg',
          },
        ],
      });

      const result = await getRandomMeal();

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );

      expect(result).toEqual({
        id: '12345',
        title: 'Random Meal',
        category: 'Beef',
        area: 'American',
        image: 'random.jpg',
        instructions: 'Random instructions',
        tags: ['Dinner', 'Easy'],
        youtube: 'random-video',
        ingredients: [{ ingredient: 'Beef', measure: '1kg' }],
      });
    });

    it('returns null when API returns no meals', async () => {
      mockFetchResponse({ meals: null });

      const result = await getRandomMeal();

      expect(result).toBeNull();
    });
  });

  describe('getCategories', () => {
    it('returns category names', async () => {
      mockFetchResponse({
        meals: [{ strCategory: 'Beef' }, { strCategory: 'Chicken' }],
      });

      const result = await getCategories();

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      );

      expect(result).toEqual(['Beef', 'Chicken']);
    });
  });

  describe('getAreas', () => {
    it('returns area names', async () => {
      mockFetchResponse({
        meals: [{ strArea: 'Canadian' }, { strArea: 'Italian' }],
      });

      const result = await getAreas();

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
      );

      expect(result).toEqual(['Canadian', 'Italian']);
    });
  });

  describe('getIngredients', () => {
    it('returns ingredient names', async () => {
      mockFetchResponse({
        meals: [{ strIngredient: 'Chicken' }, { strIngredient: 'Salt' }],
      });

      const result = await getIngredients();

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
      );

      expect(result).toEqual(['Chicken', 'Salt']);
    });
  });

  describe('filterMealsByCategory', () => {
    it('returns empty array when category is empty', async () => {
      const result = await filterMealsByCategory('');

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches meals by category and normalizes short meal data', async () => {
      mockFetchResponse({
        meals: [
          {
            idMeal: '1',
            strMeal: 'Fish Pie',
            strMealThumb: 'fish.jpg',
          },
        ],
      });

      const result = await filterMealsByCategory('Seafood');

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
      );

      expect(result).toEqual([
        {
          id: '1',
          title: 'Fish Pie',
          image: 'fish.jpg',
        },
      ]);
    });
  });

  describe('filterMealsByArea', () => {
    it('returns empty array when area is empty', async () => {
      const result = await filterMealsByArea('');

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches meals by area', async () => {
      mockFetchResponse({
        meals: [
          {
            idMeal: '2',
            strMeal: 'Poutine',
            strMealThumb: 'poutine.jpg',
          },
        ],
      });

      const result = await filterMealsByArea('Canadian');

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian'
      );

      expect(result).toEqual([
        {
          id: '2',
          title: 'Poutine',
          image: 'poutine.jpg',
        },
      ]);
    });
  });

  describe('filterMealsByIngredient', () => {
    it('returns empty array when ingredient is empty', async () => {
      const result = await filterMealsByIngredient('');

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches meals by ingredient', async () => {
      mockFetchResponse({
        meals: [
          {
            idMeal: '3',
            strMeal: 'Chicken Handi',
            strMealThumb: 'handi.jpg',
          },
        ],
      });

      const result = await filterMealsByIngredient('Chicken');

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken'
      );

      expect(result).toEqual([
        {
          id: '3',
          title: 'Chicken Handi',
          image: 'handi.jpg',
        },
      ]);
    });
  });

  describe('getMealById', () => {
    it('returns null when id is missing', async () => {
      const result = await getMealById('');

      expect(result).toBeNull();
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches meal details by id and normalizes data', async () => {
      mockFetchResponse({
        meals: [
          {
            idMeal: '52772',
            strMeal: 'Teriyaki Chicken Casserole',
            strCategory: 'Chicken',
            strArea: 'Japanese',
            strMealThumb: 'image.jpg',
            strInstructions: 'Cook it well',
            strTags: 'Meat,Casserole',
            strYoutube: 'youtube-link',
            strIngredient1: 'Chicken',
            strMeasure1: '500g',
          },
        ],
      });

      const result = await getMealById('52772');

      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772'
      );

      expect(result).toEqual({
        id: '52772',
        title: 'Teriyaki Chicken Casserole',
        category: 'Chicken',
        area: 'Japanese',
        image: 'image.jpg',
        instructions: 'Cook it well',
        tags: ['Meat', 'Casserole'],
        youtube: 'youtube-link',
        ingredients: [{ ingredient: 'Chicken', measure: '500g' }],
      });
    });

    it('returns null when API returns no meal', async () => {
      mockFetchResponse({ meals: null });

      const result = await getMealById('99999');

      expect(result).toBeNull();
    });
  });
});
