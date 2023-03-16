import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { truncateWithEllipse } from '../util/string.util';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async save<T extends object>(name: string, value: T): Promise<void> {
    console.log(
      `[STORAGE] saving '${name}' as ${truncateWithEllipse(
        JSON.stringify(value),
        100
      )}`
    );
    await Preferences.set({
      key: name,
      value: JSON.stringify(value),
    });
  }

  async load<T extends object>(name: string): Promise<T | null> {
    const data = await Preferences.get({ key: name });
    console.log(
      `[STORAGE] loading '${name}' as ${truncateWithEllipse(data.value, 100)}`
    );
    return data.value ? JSON.parse(data.value) : null;
  }
}
