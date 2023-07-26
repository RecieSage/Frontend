import Ingredient from './ingredient';

export default class Recipe {
  public id: number;
  public name: string;
  public instructions: string;
  public ingredients: Array<Ingredient>;

  constructor(
    name?: string,
    instructions?: string,
    ingredients?: Array<Ingredient>
  ) {
    this.id = -1;
    this.name = name || '';
    this.instructions = instructions || '';
    this.ingredients = ingredients || [];
  }
}
