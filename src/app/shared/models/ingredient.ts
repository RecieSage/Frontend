export default class Ingredient {
  public id: number;
  public name: string;
  public amount: number;
  public unit: string;

  constructor(name?: string, amount?: number, unit?: string) {
    this.id = -1;
    this.name = name || '';
    this.amount = amount || 0;
    this.unit = unit || '';
  }
}
