# Word multi search

This project aims to help with building your anki cards set for learning a new language.

This is a helper for fluent-forever.com method and is based on fluent-forever.com/multi-search

## User Stories

- [x] When the user opens the app for the first time no word is chosen, settings are default and only the search bar is visible
- [x] When the user opens the app (not for the first time), the last word is chosen
- The user can check a word as done
- The user can search for done words, but these words won't be selected automatically.
- The user can set which sites are used for search.
- The user can add new sites.
- The user can delete sites.
- The user can disable a site (from being searched)
- The user can select whether a site can be opened in an external window
- When the user searches for a word it will open a tab for each site
- The user can decide to search in one site (including disabled)
- The user can close any tab
- The user can refresh any tab
- The user can move a tab to external window
- Settings are persisted
- These are the settings:
  - List of search engines
    - Name, url, enabled, external
  - Should external windows close when searching
- different settings are saved between page changes

## Data models

**Search Engine**

```js
{
  disabled: bool,
  name: string,
  urlTemplate: string (%s for keyword)
  external: bool,
  id: number
}
```

**English Word**

```js
{
  word: string,
  category: string,
  done: bool
}
```

**Target language word**

```js
{
  english: string,
  translation: string
}
```

**Settings**

```js
{
  searchEngines: SearchEngine[],
  closeWindowsOnSearch: bool
}
```

**State**

```js
{
  settings: Settings,
  englishWords: EnglishWord[],
  targetLanguage: "spanish",
  translations: {
    [language]: TargetLanguageWord
  },
  openTabs: number[],
  // openWindows: window[]
}
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```
