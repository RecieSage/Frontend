import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  // getRecipes as Observable
  public getRecipes(): Observable<Array<Recipe>> {
    return new Observable<Array<Recipe>>((observer) => {
      axios
        .get('https://localhost:7016/Recepies')
        .then((response) => {
          throw new Error('Method not implemented.');
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
