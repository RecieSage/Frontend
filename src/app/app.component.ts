import { Component } from '@angular/core';
import { RecipeService } from './shared/services/recipe.service';
import Ingredient from './shared/models/ingredient';
import Recipe from './shared/models/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CockingPWA';

  constructor(private RecipeService: RecipeService) {
    RecipeService.deleteRecipe(2).subscribe((response) => {
      console.log(response);
    });
  }
}
