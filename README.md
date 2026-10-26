# Daniil Ignatev — personal site

Browser games built with AI agents: https://common-ka.github.io/

A static site with no build step: `index.html`, `styles.css`, `main.js`, interface strings in `i18n.js` and game data in `games.js`. Published with GitHub Pages: every push to `main` updates the site within 1–2 minutes.

## Languages

The site is bilingual, Russian and English. The language is picked in this order:

1. `?lang=ru` or `?lang=en` in the URL — use it for links you send to a specific audience;
2. the visitor's own choice from the RU / EN switch in the header (remembered in the browser);
3. the browser's first language: Russian for `ru`, English for everything else.

Interface strings live in `i18n.js` under the same keys as the `data-i18n` attributes in `index.html`. The text inside `index.html` is the Russian fallback.

## Adding a game

1. Put a 16:9 cover into `assets/img/covers/` in two sizes: `<id>-640.webp` and `<id>-1280.webp` (640 and 1280 px wide).
2. Open `games.js` and copy any block in the `games` list. The order of the blocks is the order of the cards on the site.
3. Edit the fields and save. That's it.

Quick edits work right in the browser: press `.` on the repository page to open the editor.

Every text field is either a plain string (the same in both languages) or a pair: `{ ru: '…', en: '…' }`.

### Card fields

| Field | What it is | Required |
| --- | --- | --- |
| `id` | Short Latin name, matches the cover file names | yes |
| `title` | Game title | yes |
| `status` | `released` — out (olive), `launch` — launching (ochre), `dev` — in development (blue) | yes |
| `statusText` | Status caption, e.g. `Released · Playgama and Yandex Games` | yes |
| `genre` | Genre in one line | no |
| `hook` | One or two sentences: what the player does | no |
| `rating` | Rating line, e.g. `★ 4.3 / 5 on Playgama · 96 ratings` | no |
| `cover` | `{ image: 'assets/img/covers/<id>', alt: 'cover description' }`; add `position: 'left center'` if the important part of the cover is near an edge. No cover yet: `{ placeholder: 'voxels' }` | yes |
| `links` | Buttons: `{ label: '▶ CrazyGames', url: '…', primary: true }`. Only one primary button | no |
| `soon` | Dashed "coming soon" plates, e.g. `[{ ru: 'Скоро на Playgama', en: 'Coming to Playgama' }]` | no |
| `stack` | Technology tags | no |
| `how` | The collapsible "How it's made" block: `notes` (title + text cards), `shots` (screenshots) or `extra` (a sub-block such as the Playable Ad) | no |

Screenshot: `{ src: 'assets/img/….webp', w: 390, h: 700, alt: '…', caption: 'Hook' }`.

### The "Now" block

The rows above the cards are the `now` list at the top of `games.js`: `{ label: { ru: 'Сейчас', en: 'Now' }, text: { ru: '…', en: '…' } }`.

## Structure

```
index.html        page markup (Russian fallback text)
styles.css        styles
main.js           language switch, game cards from games.js, faceted sky, lithographic texture
i18n.js           interface strings in Russian and English
games.js          game data — the file you edit most often
assets/logo/      the "Square-pixel" mark and the favicon
assets/img/       covers and screenshots
```

The brand book (palette, type, components, logo) is kept separately.
