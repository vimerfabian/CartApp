import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeDetectionService {
  isDarkTheme: boolean;

  constructor() {
    // Utiliza el plugin para detectar el tema
    ThemeDetection.isDarkModeEnabled().then((darkModeEnabled) => {
      this.isDarkTheme = darkModeEnabled;
    });
  }

  // Método para obtener el estado del tema
  getIsDarkTheme(): boolean {
    return this.isDarkTheme;
  }
}
