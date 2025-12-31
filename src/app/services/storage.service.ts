import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //ensure that the favourites array doesn't get overwritten each time the recipe-details page is opened
  initKey<T>(key: string, defaultValue: T): void {
  const existing = localStorage.getItem(key);
  if (existing === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  //favourites methods to call in other pages
  getFavourites(): string[] {
    return this.get<string[]>("favourites") ?? [] ;
  }

  addFavourite(id: string): void {
    var favs = this.getFavourites();
    if (!favs.includes(id)) {
      favs.push(id);
      this.set("favourites", favs);
    }
  }

  removeFavourite(id: string): void {
    var favs = this.getFavourites().filter(x => x !== id);
    this.set("favourites", favs);
  }

  isFavourite(id: string): boolean {
    var favs = this.getFavourites();
    if(favs.includes(id)) {
      return true;
    }
    else return false;
  }

}
