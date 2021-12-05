import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MoviedbService {
  baseUrl: string = "https://api.themoviedb.org/3/";
  apiKey: string = "api_key=c4d40d6352d10e42c2b986487eb58bbb";

  constructor(private http: HttpClient) {}

  getMovies(type: string) {
    return this.http
      .get(this.baseUrl + `movie/${type}?` + this.apiKey)
      .toPromise();
  }

  getMoviesFromGenre(genre: string) {
    const genreId: any = {
      adventure: 12,
      action: 28,
      comedy: 35,
      horror: 27,
      romance: 10749,
      family: 10751,
    };
    return this.http
      .get(
        this.baseUrl +
          `discover/movie?${this.apiKey}&with_genres=${genreId[genre]}`
      )
      .toPromise();
  }
}
