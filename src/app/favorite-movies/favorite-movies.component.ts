import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../prediction-event";

@Component({
  selector: "app-favorite-movies",
  templateUrl: "./favorite-movies.component.html",
  styleUrls: ["./favorite-movies.component.css"],
})
export class FavoriteMoviesComponent implements OnInit {
  static movies: any[];

  constructor() {}

  ngOnInit(): void {
    console.log(FavoriteMoviesComponent.movies);
  }

  get staticMovies() {
    return FavoriteMoviesComponent.movies;
  }

  prediction(event: PredictionEvent) {
    const prediction = event.getPrediction();

    if (prediction == "Two Closed Hands") {
      window.open("/", "_self");
    }
  }
}
