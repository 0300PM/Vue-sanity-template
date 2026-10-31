# Vue + TypeScript + Tailwind CSS + Sanity

Niezależny szablon aplikacji Vite i osobnego Sanity Studio. Aplikacja wyświetla opublikowane dokumenty typu `post` z publicznego datasetu Sanity. Nie wymaga tokena w przeglądarce.

## Wymagania

- Node.js 22 lub nowszy oraz npm
- Projekt Sanity i publiczny dataset, np. `production`

Projekt i dataset możesz utworzyć w [Sanity Manage](https://www.sanity.io/manage). Project ID znajdziesz w ustawieniach projektu. Nie używaj tajnych tokenów w zmiennych `VITE_` ani `SANITY_STUDIO_` — są dostępne w kodzie przeglądarki.

## Konfiguracja

1. Skopiuj `.env.example` do `.env.local` w katalogu aplikacji i wpisz Project ID oraz nazwę datasetu.
2. Skopiuj `studio/.env.example` do `studio/.env.local` i wpisz te same wartości.
3. W ustawieniach CORS projektu Sanity dodaj `http://localhost:5173` dla aplikacji oraz `http://localhost:3333` dla Studio. Dla Studio włącz opcję dopuszczania danych uwierzytelniających. Dodaj również adresy produkcyjne i adres podglądu, jeśli z nich korzystasz.
4. Zainstaluj zależności aplikacji i Studio:

```bash
npm install
npm run studio:install
```

## Uruchomienie

W dwóch terminalach:

```bash
npm run dev
```

```bash
npm run studio:dev
```

Aplikacja działa domyślnie pod `http://localhost:5173`, a Studio pod `http://localhost:3333`. Zaloguj się w Studio, utwórz i opublikuj wpis. Jeśli port jest zajęty, Vite może wybrać inny — dopisz jego adres do CORS.

## Komendy

- `npm run build` — sprawdzenie typów i build aplikacji w `dist/`
- `npm run preview` — lokalny podgląd buildu aplikacji
- `npm run studio:build` — build Studio w `studio/dist/`
- `npm --prefix studio run deploy` — publikacja Studio w Sanity

Schemat treści znajduje się w `studio/schemaTypes/post.ts`, zapytanie GROQ i typ danych w `src/lib/sanity.ts`. Po zmianie zmiennych środowiskowych uruchom ponownie odpowiedni serwer. CDN Sanity może przez krótki czas zwracać starsze dane po publikacji.
