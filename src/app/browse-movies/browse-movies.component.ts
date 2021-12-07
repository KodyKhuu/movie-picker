import { Component, OnInit } from "@angular/core";
import { MoviedbService } from "../moviedb.service";
import { PredictionEvent } from "../prediction-event";
import { ActivatedRoute } from "@angular/router";
import { FavoriteMoviesComponent } from "../favorite-movies/favorite-movies.component";

@Component({
  selector: "app-browse-movies",
  templateUrl: "./browse-movies.component.html",
  styleUrls: ["./browse-movies.component.css"],
  providers: [MoviedbService],
})
export class BrowseMoviesComponent implements OnInit {
  movies: any = [];
  index: number = 0;

  currentMovie: any = { title: "" };
  currentImage: string;

  browseType: string;

  counterNext: number = 0;
  counterAdd: number = 0;
  counterHome: number = 0;
  counterFavorites: number = 0;

  showError: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private moviedbService: MoviedbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.browseType = this.route.snapshot.paramMap.get("type") as string;

    if (
      ["adventure", "action", "comedy", "horror", "romance", "family"].includes(
        this.browseType
      )
    ) {
      this.moviedbService
        .getMoviesFromGenre(this.browseType)
        .then((data: any) => {
          this.movies = data.results;
          this.currentMovie = this.movies[this.index];
          this.currentImage =
            "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
        });
    } else {
      this.moviedbService.getMovies(this.browseType).then((data: any) => {
        this.movies = data.results;
        this.currentMovie = this.movies[this.index];
        this.currentImage =
          "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
      });
    }
  }

  prediction(event: PredictionEvent) {
    const prediction = event.getPrediction();
    if (prediction === "Hand Pointing") {
      this.counterNext++;

      if (this.counterNext === 3) {
        this.counterNext = 0;
        if (this.index === this.movies.length) {
          this.index = 0;
          this.currentMovie = this.movies[this.index];
        } else {
          this.index = this.index + 1;
          this.currentMovie = this.movies[this.index];
        }
        this.currentImage =
          "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
      }
    } else if (prediction === "Two Hands Pointing") {
      this.counterNext++;

      if (this.counterNext === 3) {
        this.counterNext = 0;
        if (this.index === 0) {
          this.index = this.movies.length - 1;
          this.currentMovie = this.movies[this.index];
        } else {
          this.index = this.index - 1;
          this.currentMovie = this.movies[this.index];
        }
        this.currentImage =
          "http://image.tmdb.org/t/p/w500" + this.currentMovie.poster_path;
      }
    } else if (prediction === "Open Hand") {
      this.counterAdd++;

      if (this.counterAdd === 3) {
        this.counterAdd = 0;
        const favMoviesFromStorage = window.localStorage.getItem("favMovies");
        if (!favMoviesFromStorage) {
          const favMovies = [this.currentMovie];
          window.localStorage.setItem("favMovies", JSON.stringify(favMovies));
        } else {
          let parsedMovies = JSON.parse(favMoviesFromStorage);
          for (let i = 0; i < parsedMovies.length; i++) {
            if (parsedMovies[i].id === this.currentMovie.id) {
              this.showError = true;

              setTimeout(() => {
                this.showError = false;
              }, 2000);

              return;
            }
          }
          parsedMovies.push(this.currentMovie);
          window.localStorage.setItem(
            "favMovies",
            JSON.stringify(parsedMovies)
          );

          this.showSuccess = true;

          setTimeout(() => {
            this.showSuccess = false;
          }, 2000);
        }
      }
    } else if (prediction == "Two Closed Hands") {
      this.counterFavorites++;
      if (this.counterFavorites === 5) {
        this.counterFavorites = 0;
        window.open("/favorites", "_self");
      }
    } else if (prediction == "Closed Hand") {
      this.counterHome++;
      if (this.counterHome === 10) {
        this.counterHome = 0;
        window.open("/", "_self");
      }
    }
  }
}
