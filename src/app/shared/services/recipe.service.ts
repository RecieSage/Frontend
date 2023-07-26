import { Injectable } from '@angular/core';
import Recipemin from '../models/recipe-min';
import Recipe from '../models/recipe';
import Ingredient from '../models/ingredient';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  // Returns an Array of Recipemin objects
  // If searchquery is provided, only returns recipes that match the searchquery
  public getRecipes(searchquery?: string): Observable<Array<Recipemin>> {
    return new Observable<Array<Recipemin>>((observer) => {
      axios
        .get(
          `https://localhost:7016/Recepies${
            searchquery ? `?search=${searchquery}` : ''
          }`
        )
        .then((response: AxiosResponse) => {
          if (!Array.isArray(response.data))
            throw new Error('Response is not an array');

          const recipes: Array<Recipemin> = response.data.map((recipedata) => {
            return new Recipemin(recipedata.id, recipedata.name);
          });

          observer.next(recipes);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Returns a Recipe object
  // Gests the recipe with the provided id
  public getRecipe(id: number): Observable<Recipe> {
    return new Observable<Recipe>((observer) => {
      axios
        .get(`https://localhost:7016/Recepies/${id}`)
        .then((response: AxiosResponse) => {
          const recipe = this.contructRecipeFromResponse(response);

          observer.next(recipe);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Returns a Recipe object
  // Creates a new recipe with the provided recipe object
  public postRecipe(recipe: Recipe): Observable<Recipe> {
    return new Observable<Recipe>((observer) => {
      if (recipe.id !== -1)
        throw new Error('Recipe already has an id and cannot be posted');

      axios
        .post('https://localhost:7016/Recepies', recipe)
        .then((response: AxiosResponse) => {
          const recipe = this.contructRecipeFromResponse(response);

          observer.next(recipe);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Returns a Recipe object
  // Replaces the recipe with the provided recipe object
  public putRecipe(recipe: Recipe): Observable<Recipe> {
    return new Observable<Recipe>((observer) => {
      if (recipe.id === -1)
        throw new Error('Recipe does not have an id and cannot be put');

      axios
        .put(`https://localhost:7016/Recepies/${recipe.id}`, recipe)
        .then((response: AxiosResponse) => {
          const recipe = this.contructRecipeFromResponse(response);

          observer.next(recipe);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Returns a Boolean that indicates if the recipe was deleted. False if the recipe was not found
  // Deletes the recipe with the provided id
  public deleteRecipe(id: number | Recipe): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (typeof id === 'object') id = id.id;
      if (id === -1)
        throw new Error('Recipe does not have an id and cannot be deleted');

      axios
        .delete(`https://localhost:7016/Recepies/${id}`)
        .then((response: AxiosResponse) => {
          if (response.status == 200) {
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        })
        .catch((error) => {
          if (error.response.status == 404) {
            observer.next(false);
            observer.complete();
          }
          observer.error(error);
        });
    });
  }

  private contructRecipeFromResponse(response: AxiosResponse): Recipe {
    const recipedata = response.data;

    if (!recipedata.ingredients || !Array.isArray(recipedata.ingredients))
      throw new Error('Response does not contain valid ingredients');

    const recipe = new Recipe(recipedata.name, recipedata.instructions);

    const ingredients: Array<Ingredient> = recipedata.ingredients.map(
      (ingredientdata: any) => {
        var ingredient = new Ingredient(
          ingredientdata.name,
          ingredientdata.amount,
          ingredientdata.unit
        );
        ingredient.id = ingredientdata.id;
        return ingredient;
      }
    );

    recipe.id = recipedata.id;
    recipe.ingredients = ingredients;

    return recipe;
  }
}
