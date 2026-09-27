---
version: 1
slug: "src-views-homeview-vue"
primary_target: "src/views/HomeView.vue"
related_targets: ["src/App.vue","src/router/index.ts"]
---

# Surface: GameTestSpace public site (home + articles, news, showcase, about)

Mode: Persuade (home), Read (article/news detail). Audience: prospective members and returning members, weighted equally. Action: read the issue and join the Discord. Content is labelled sample content until real content exists. The Discord invite URL is undecided and lives in a named placeholder constant.

## Direction contract

THESIS: The site is a monthly game magazine that never stops publishing, with news, features, and member work bound into one issue. It refuses the dark game-portal default of a carousel over a card grid.

OWN-WORLD: Cream newsprint (#EEEAE0) and ink (#18171C), with full ink spreads inverting the page. Signal orange (#FF6B2C) marks only what is live or new right now: the newest issue, streams on air, work that just landed, and the REC dot. The Discord join action is an ink button whose only orange is the REC dot (raise from Raku). Noto Sans TC 900 sets the headlines, Archivo sets Latin and numerals, and JetBrains Mono is used only for folios, dates, and timecodes. Screenshots print as halftone. One strict 12-column grid governs every rule, thumb tab, and score box (raise from ASCII). Thumb-index tabs on the right edge act as navigation. Page folios run on every section.

STORY: The visitor sees an issue cover with a real headline and understands that this is a community of people who play, test, and make games. They scan the news, open a feature, and see member work given full cover-scale billing (raise from Skate deck). Then they join the Discord through the reader hotline.

FIRST VIEWPORT: The masthead wordmark spans the width, with the issue number and date in mono. Below it, a 2:1 cover plate takes 8 columns. On it, one giant headline word wins, printed in two inks where it crosses the plate edge (raise from Fly-poster). The plate edge carries three cover lines linking to the review score, the lead member work, and the live item. The cover story title sits in an ink band under the plate. The right 4 columns open with the ink reader hotline, which holds the one-sentence community description and the join button. It sits top-right rather than lower-right so a newcomer reads what this is before the contents list; this was a deliberate change after review. The contents list with page numbers follows.

FORM: The Japanese and Taiwanese game monthly (Famitsu / 電視遊樂雜誌), position 3 of 7, seed key d397bb47. Signature interaction: the viewfinder brackets snap around a hovered or focused cover with the REC dot and a running timecode. Motion grammar: an ease-out-expo snap of 220ms, with no scattered entrances.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
