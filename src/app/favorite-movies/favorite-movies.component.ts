import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../prediction-event";

@Component({
  selector: "app-favorite-movies",
  templateUrl: "./favorite-movies.component.html",
  styleUrls: ["./favorite-movies.component.css"],
})
export class FavoriteMoviesComponent implements OnInit {
  static movies: any[];

  index: number = 0;
  rankingIndex: number = 0;

  currentMovie: any;

  isRanking: boolean = false;

  rankCount: number = 0;
  selectCount: number = 0;
  homeCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    const favMoviesFromStorage = window.localStorage.getItem("favMovies");
    if (!favMoviesFromStorage) {
      FavoriteMoviesComponent.movies = [];
    } else {
      FavoriteMoviesComponent.movies = JSON.parse(favMoviesFromStorage);
      this.currentMovie = FavoriteMoviesComponent.movies[this.index];
    }
  }

  get staticMovies() {
    return FavoriteMoviesComponent.movies;
  }

  prediction(event: PredictionEvent) {
    const prediction = event.getPrediction();

    if (prediction == "One Closed One Pointing") {
      this.homeCount++;
      if (this.homeCount === 5) {
        this.homeCount = 0;
        window.open("/", "_self");
      }
    } else if (prediction === "Open Hand") {
      this.rankCount++;
      if (this.rankCount === 3) {
        this.rankCount = 0;
        this.isRanking = !this.isRanking;
        if (!this.isRanking) {
          this.currentMovie = FavoriteMoviesComponent.movies[this.index];
          this.rankingIndex = this.index;
          window.localStorage.setItem(
            "favMovies",
            JSON.stringify(FavoriteMoviesComponent.movies)
          );
        }
      }
    } else if (prediction == "Hand Pointing") {
      this.selectCount++;
      if (this.selectCount === 3) {
        this.selectCount = 0;
        if (!this.isRanking) {
          if (this.index === FavoriteMoviesComponent.movies.length) {
            this.index = 0;

            this.currentMovie = FavoriteMoviesComponent.movies[this.index];
          } else {
            this.index = this.index + 1;
            this.currentMovie = FavoriteMoviesComponent.movies[this.index];
          }
          this.rankingIndex = this.index;
        } else {
          if (this.rankingIndex === FavoriteMoviesComponent.movies.length - 1) {
            const movie = FavoriteMoviesComponent.movies[0];

            FavoriteMoviesComponent.movies[0] =
              FavoriteMoviesComponent.movies[this.rankingIndex];
            FavoriteMoviesComponent.movies[this.rankingIndex] = movie;

            this.rankingIndex = 0;
            // this.currentMovie = FavoriteMoviesComponent.movies[this.rankingIndex];
          } else {
            const movie = FavoriteMoviesComponent.movies[this.rankingIndex + 1];

            FavoriteMoviesComponent.movies[this.rankingIndex + 1] =
              FavoriteMoviesComponent.movies[this.rankingIndex];
            FavoriteMoviesComponent.movies[this.rankingIndex] = movie;

            // this.currentMovie = FavoriteMoviesComponent.movies[this.index++];
            this.rankingIndex++;
          }
        }
      }
    } else if (prediction === "Two Open Hands") {
      this.selectCount++;
      if (this.selectCount === 3) {
        this.selectCount = 0;
        if (!this.isRanking) {
          if (this.index === 0) {
            this.index = FavoriteMoviesComponent.movies.length - 1;

            this.currentMovie = FavoriteMoviesComponent.movies[this.index];
          } else {
            this.index = this.index - 1;
            this.currentMovie = FavoriteMoviesComponent.movies[this.index];
          }
          this.rankingIndex = this.index;
        } else {
          if (this.rankingIndex === 0) {
            const movie =
              FavoriteMoviesComponent.movies[
                FavoriteMoviesComponent.movies.length - 1
              ];

            FavoriteMoviesComponent.movies[
              FavoriteMoviesComponent.movies.length - 1
            ] = FavoriteMoviesComponent.movies[this.rankingIndex];
            FavoriteMoviesComponent.movies[this.rankingIndex] = movie;

            this.rankingIndex = FavoriteMoviesComponent.movies.length - 1;
            // this.currentMovie = FavoriteMoviesComponent.movies[this.rankingIndex];
          } else {
            const movie = FavoriteMoviesComponent.movies[this.rankingIndex - 1];

            FavoriteMoviesComponent.movies[this.rankingIndex - 1] =
              FavoriteMoviesComponent.movies[this.rankingIndex];
            FavoriteMoviesComponent.movies[this.rankingIndex] = movie;

            // this.currentMovie = FavoriteMoviesComponent.movies[this.index++];
            this.rankingIndex--;
          }
        }
      }
    }
  }
}
