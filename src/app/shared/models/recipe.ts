import { Ingredient } from './ingredient';

export class Recipe {
  public id: number;
  public name: string;
  public instructions: string;
  public ingredients: Array<Ingredient>;

  constructor(
    id?: number,
    name?: string,
    instructions?: string,
    ingredients?: Array<Ingredient>
  ) {
    this.id = id || 0;
    this.name = name || '';
    this.instructions = instructions || '';
    this.ingredients = ingredients || [];
  }
}
