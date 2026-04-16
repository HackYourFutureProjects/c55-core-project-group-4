import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSavedRecipes,
  saveRecipe,
  removeSavedRecipe,
  isRecipeSaved,
  toggleFavourite,
} from '../public/js/services/favourites.js';

describe('favourites.js', () => {
  /**
   * Clear localStorage before each test
   * to keep tests isolated
   */
  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Tests for reading saved recipes
   */
  describe('getSavedRecipes', () => {
    it('returns an empty array when localStorage is empty', () => {
      expect(getSavedRecipes()).toEqual([]);
    });

    it('returns saved recipes when valid data exists in localStorage', () => {
      const mockRecipes = [
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ];

      localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

      expect(getSavedRecipes()).toEqual(mockRecipes);
    });

    it('returns an empty array when stored JSON is invalid', () => {
      localStorage.setItem('favoriteRecipes', 'invalid json');

      expect(getSavedRecipes()).toEqual([]);
    });

    it('returns an empty array when stored data is not an array', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify({ id: '1' }));

      expect(getSavedRecipes()).toEqual([]);
    });
  });

  /**
   * Tests for saving recipes
   */
  describe('saveRecipe', () => {
    it('adds a new recipe to localStorage', () => {
      const recipe = {
        id: 1,
        title: 'Pizza',
        image: 'pizza.jpg',
      };

      const result = saveRecipe(recipe, 'mealdb');

      const expected = [
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ];

      expect(result).toEqual(expected);
      expect(getSavedRecipes()).toEqual(expected);
    });

    it('does not add duplicate recipes', () => {
      const recipe = {
        id: 1,
        title: 'Pizza',
        image: 'pizza.jpg',
      };

      saveRecipe(recipe, 'mealdb');
      const result = saveRecipe(recipe, 'mealdb');

      expect(result).toHaveLength(1);
      expect(result).toEqual([
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ]);
    });

    it('allows same id with different sources', () => {
      const recipe = {
        id: 1,
        title: 'Pizza',
        image: 'pizza.jpg',
      };

      const firstResult = saveRecipe(recipe, 'mealdb');
      const secondResult = saveRecipe(recipe, 'cohort');

      expect(firstResult).toEqual([
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ]);

      expect(secondResult).toEqual([
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
        {
          id: '1',
          source: 'cohort',
          key: 'cohort-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ]);
    });
  });

  /**
   * Tests for checking if a recipe is saved
   */
  describe('isRecipeSaved', () => {
    it('returns true when the recipe exists', () => {
      saveRecipe(
        {
          id: 1,
          title: 'Pizza',
          image: 'pizza.jpg',
        },
        'mealdb'
      );

      expect(isRecipeSaved(1, 'mealdb')).toBe(true);
    });

    it('returns false when the recipe does not exist', () => {
      expect(isRecipeSaved(1, 'mealdb')).toBe(false);
    });

    it('distinguishes between different sources', () => {
      saveRecipe(
        {
          id: 1,
          title: 'Pizza',
          image: 'pizza.jpg',
        },
        'mealdb'
      );

      expect(isRecipeSaved(1, 'mealdb')).toBe(true);
      expect(isRecipeSaved(1, 'cohort')).toBe(false);
    });
  });

  /**
   * Tests for removing saved recipes
   */
  describe('removeSavedRecipe', () => {
    it('removes a recipe by id and source', () => {
      saveRecipe(
        {
          id: 1,
          title: 'Pizza',
          image: 'pizza.jpg',
        },
        'mealdb'
      );

      const result = removeSavedRecipe(1, 'mealdb');

      expect(result).toEqual([]);
      expect(getSavedRecipes()).toEqual([]);
    });

    it('does not remove recipes from other sources', () => {
      saveRecipe(
        {
          id: 1,
          title: 'Pizza',
          image: 'pizza.jpg',
        },
        'mealdb'
      );

      saveRecipe(
        {
          id: 1,
          title: 'Pizza Cohort',
          image: 'pizza2.jpg',
        },
        'cohort'
      );

      const result = removeSavedRecipe(1, 'mealdb');

      expect(result).toEqual([
        {
          id: '1',
          source: 'cohort',
          key: 'cohort-1',
          title: 'Pizza Cohort',
          image: 'pizza2.jpg',
        },
      ]);

      expect(getSavedRecipes()).toEqual([
        {
          id: '1',
          source: 'cohort',
          key: 'cohort-1',
          title: 'Pizza Cohort',
          image: 'pizza2.jpg',
        },
      ]);
    });

    it('returns unchanged array when recipe does not exist', () => {
      saveRecipe(
        {
          id: 1,
          title: 'Pizza',
          image: 'pizza.jpg',
        },
        'mealdb'
      );

      const result = removeSavedRecipe(2, 'mealdb');

      expect(result).toEqual([
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ]);
    });
  });

  /**
   * Tests for toggling favorite state
   */
  describe('toggleFavourite', () => {
    it('adds a recipe when it is not already saved', () => {
      const recipe = {
        id: 1,
        title: 'Pizza',
        image: 'pizza.jpg',
      };

      const result = toggleFavourite(recipe, 'mealdb');

      expect(result).toEqual([
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ]);

      expect(getSavedRecipes()).toEqual([
        {
          id: '1',
          source: 'mealdb',
          key: 'mealdb-1',
          title: 'Pizza',
          image: 'pizza.jpg',
        },
      ]);
    });

    it('removes a recipe when it is already saved', () => {
      const recipe = {
        id: 1,
        title: 'Pizza',
        image: 'pizza.jpg',
      };

      saveRecipe(recipe, 'mealdb');
      const result = toggleFavourite(recipe, 'mealdb');

      expect(result).toEqual([]);
      expect(getSavedRecipes()).toEqual([]);
    });
  });
});
