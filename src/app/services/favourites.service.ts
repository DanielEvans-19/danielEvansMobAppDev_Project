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

  async remove(id: string | number) {
  // Get the current list from storage
  const list: (string | number)[] = (await this.getAll()) || [];
  const filtered = list.filter(item => item.toString() !== id.toString());
  // Save the updated list back to storage
  await this.storage.set(this.storageKey, filtered);
}

  async isFavourite(id: string) {
    const list = await this.getAll();
    return list.includes(id);
  }
}