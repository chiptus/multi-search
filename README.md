# Word multi search

This project aims to help with building your anki cards set for learning a new language.

This is a helper for fluent-forever.com method and is based on fluent-forever.com/multi-search

## User Stories

- [x] When the user opens the app for the first time no word is chosen, settings are default and only the search bar is visible
- [x] When the user opens the app (not for the first time), the last word is chosen
- [x] The user can check a word as done
- [x] The user can search for done words, but these words won't be selected automatically.
- [x] The user can set which sites are used for search.
- [x] The user can add new sites.
- [x] The user can delete sites.
- [x] The user can disable a site (from being searched)
- [x] The user can select whether a site can be opened in an external window
- [x] When the user searches for a word it will open a tab for each site
- [x] The user can decide to search in one site (including disabled)
- [x] When the user searches for a single site, it doesn't close the other tabs/windows
- [x] The user can close any tab
- [x] The user can refresh any tab
- [x] The user can move a tab to external window
- [x] Settings are persisted
- [x] These are the settings:
  - [x] List of search engines
    - [x] Name, url, enabled, external
  - [x] Should external windows close when searching
- [x] different settings are saved between page changes

### v2

- [ ] Word list is downloaded from wikipedia's top X words
- [ ] The user can choose a list and the backend will download the word list. when it's done there will be a notification to the user.

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
