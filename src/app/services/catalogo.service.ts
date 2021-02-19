import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CatalogoService {
  constructor(private http: HttpClient) {}

  end_point = environment.server;

  index_publications(page): Observable<any> {
    return this.http.get<any>(this.end_point + "catalogs/publications", {
      params: { page },
    });
  }

  search_publication() {}

  create_publications(): Observable<any> {
    return this.http.get<any>(this.end_point + "catalogs/publications/create");
  }

  create_publication_name(name): Observable<any> {
    return this.http.post(this.end_point + "catalogs/publications", { name });
  }
  update_publication_name(name): Observable<any> {
    return this.http.put(this.end_point + "catalogs/publications", { name });
  }

  predictor_keyup(title): Observable<any> {
    return this.http.post(
      this.end_point + "catalogs/publications/category-predictor",
      { title }
    );
  }
  // index(page):Observable<any>{
  //   return this.http.get<any>(this.end_point+'catalogs/publications/category-predictor',{params:{page}});
  // }
  getAttributes(id): Observable<any> {
    return this.http.get(
      this.end_point +
        `catalogs/publications/category-predictor/${id}/attributes`
    );
  }

  categoriesMl(name): Observable<any> {
    return this.http.get(
      `http://api.mercadolibre.com/sites/MEC/domain_discovery/search?q=${name}`
    );
  }

  destroyPublications(id): Observable<any>{
    return this.http.delete(this.end_point+"catalogs/publications/"+id);
  }
}
