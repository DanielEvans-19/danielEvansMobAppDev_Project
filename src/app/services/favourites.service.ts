import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private storageKey = 'favourites';

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async getAll(): Promise<string[]> {
    return (await this.storage.get(this.storageKey)) || [];
  }

  async add(id: string) {
    const list = await this.getAll();
    await this.storage.set(this.storageKey, [...new Set([...list, id])]);
  }

  async remove(id: string) {
    const list = await this.getAll();
    await this.storage.set(this.storageKey, list.filter(x => x !== id));
  }

  async isFavourite(id: string) {
    const list = await this.getAll();
    return list.includes(id);
  }
}