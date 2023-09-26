import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeDetectionService {
  constructor() {}

  public getDefaultTheme() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  public toggleTheme(event) {
    const theme = event.detail.checked ? 'dark' : 'light';
    document.body.setAttribute('color-theme', theme);
    localStorage.setItem('theme', theme);
  }

  public applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.setAttribute('color-theme', savedTheme);
    } else {
      const defaultTheme = this.getDefaultTheme();
      document.body.setAttribute('color-theme', defaultTheme);
      localStorage.setItem('theme', defaultTheme);
    }
  }

  public isDarkTheme() {
    const currentTheme = document.body.getAttribute('color-theme');
    return currentTheme === 'dark';
  }
}
