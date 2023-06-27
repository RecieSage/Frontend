export class Ingredient {
  public id: number;
  public name: string;
  public amount: number;
  public unit: string;

  constructor(id?: number, name?: string, amount?: number, unit?: string) {
    this.id = id || 0;
    this.name = name || '';
    this.amount = amount || 0;
    this.unit = unit || '';
  }
}
