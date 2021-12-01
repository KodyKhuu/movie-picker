import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { BrowseMoviesComponent } from "./browse-movies/browse-movies.component";
import { FavoriteMoviesComponent } from "./favorite-movies/favorite-movies.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "browse/:type", component: BrowseMoviesComponent },
  { path: "favorites", component: FavoriteMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
