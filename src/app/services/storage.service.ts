import { Injectable } from '@angular/core';

//define what a favourite is, so we can store id title and image together
export interface Favourite {
  id: string;
  title: string;
  image: string;
}

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
  getFavourites(): Favourite[] {
  return this.get<Favourite[]>('favourites') ?? [];
}

 addFavourite(item: Favourite): void {
  const favs = this.getFavourites();

  // avoid duplicates by id
  if (!favs.some(f => f.id === item.id)) {
    favs.push(item);
    this.set('favourites', favs);
  }
}

  removeFavourite(id: string): void {
  const favs = this.getFavourites().filter(f => f.id !== id);
  this.set('favourites', favs);
}

  isFavourite(id: string): boolean {
    var favs = this.getFavourites();
    if(favs.some(f => f.id == id)) {
      return true;
    }
    else return false;
  }

}
