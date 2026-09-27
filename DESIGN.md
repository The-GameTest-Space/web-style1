---
name: The Game Test Space
description: A game monthly that never stops publishing, printed in ink on cream newsprint, with one orange button that is always recording.
colors:
  paper: "#eeeae0"
  paper-deep: "#e3ddcf"
  ink: "#18171c"
  ink-soft: "#3d3a35"
  ink-mute: "#5f5b52"
  rule: "#18171c"
  rule-soft: "#c9c2b2"
  on-ink: "#eeeae0"
  on-ink-mute: "#aaa396"
  ink-rule: "#3a3840"
  rec: "#ff6b2c"
typography:
  display:
    fontFamily: "Noto Sans TC, PingFang TC, Heiti TC, sans-serif"
    fontSize: "clamp(5.5rem, 12.5vw, 12rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  masthead:
    fontFamily: "Archivo, Noto Sans TC, sans-serif"
    fontSize: "clamp(40px, 6.5vw, 100px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Noto Sans TC, PingFang TC, Heiti TC, sans-serif"
    fontSize: "clamp(2.25rem, 5.6vw, 5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.01em"
  title:
    fontFamily: "Noto Sans TC, PingFang TC, Heiti TC, sans-serif"
    fontSize: "clamp(1.375rem, 2vw, 1.75rem)"
    fontWeight: 900
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Noto Sans TC, PingFang TC, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  body-read:
    fontFamily: "Noto Sans TC, PingFang TC, Heiti TC, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.95
  latin-tag:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.5em"
    fontWeight: 800
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 75"
  button:
    fontFamily: "Noto Sans TC, PingFang TC, Heiti TC, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 900
    letterSpacing: "0.04em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.02em"
    fontFeature: "'tnum' 1"
  numeral:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "'tnum' 1"
  tagline:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.32em"
rounded:
  none: "0px"
  pill: "999px"
  dot: "50%"
spacing:
  gutter: "clamp(16px, 2.6vw, 40px)"
  col-gap: "clamp(16px, 1.8vw, 28px)"
  tab-rail: "52px"
  page-max: "1480px"
  section-gap: "clamp(72px, 9vw, 140px)"
components:
  button-join-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px 0 16px"
    height: "48px"
  button-join-ink-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-join-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px 0 16px"
    height: "48px"
  button-join-paper-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-join-lg:
    padding: "0 28px 0 22px"
    height: "60px"
  nav-thumb-tab:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
    width: "{spacing.tab-rail}"
    padding: "14px 0 12px"
  nav-thumb-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  chip-work-meta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  chip-status:
    backgroundColor: "{colors.rec}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 5px"
  cover-line:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 10px 7px 12px"
  panel-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "22px 22px 24px"
  score-box-head:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "6px 12px"
---

# Design System: The Game Test Space

## Overview

**Creative North Star: "The Monthly That Never Goes to Press"**

The site is printed, not rendered. It borrows the grammar of the Japanese and Taiwanese game monthly (Famitsu, 電視遊樂雜誌): a masthead that fills the page, cover lines on the plate edge, a contents list with page numbers, a four-reviewer score box, and thumb-index tabs cut into the page edge. Every surface is cream newsprint with black ink. Depth comes from inverting the page into a full ink spread, never from lifting cards off it. Screenshots print through a halftone dot screen, and the sample plates are low-resolution pixel art, so pictures read as reproductions on paper and not as glowing monitor tiles.

Density is editorial: heavy 4px rules split the issue into sections, 1px hairlines split entries within a section, and a 12-column grid carries the spreads. Headlines are set in Noto Sans TC Black and are the loudest thing on the page after the masthead. Latin sets in Archivo; folios, dates, handles, scores and timecodes set in JetBrains Mono. There is one accent, signal orange, and it belongs to the brand's "recording" button: it lights only on things that are live or new, and on the REC dot.

The one moving part is the brand mark come alive. Hover, focus, or scroll a picture into view on a touch screen, and the viewfinder brackets from the logo snap in around it while a REC dot blinks and a timecode runs. Every transition shares one ease-out-expo curve at 220ms, and nothing animates on entrance.

**Key Characteristics:**
- Cream newsprint (paper) and near-black ink, with full ink spreads that invert the page.
- One accent, signal orange, used only for live, new, and the REC dot.
- Noto Sans TC 900 headlines, Archivo for Latin, JetBrains Mono for folios and numbers.
- Heavy 4px structural rules and 1px hairlines; no drop shadows.
- Halftone screen over every picture; pixel-art sample plates.
- Viewfinder brackets with REC dot and running timecode as the signature interaction.
- Square corners by default; roundness only where the brand mark itself is round.

## Colors

A two-ink newsprint palette with a single signal accent; almost everything is paper or ink.

### Primary
- **Recording Orange** (rec): the top button of the brand mark. Used for the REC dot in the viewfinder, the dot inside the Discord join button, the 直播中 / NEW status chips, the live dot on news and cover lines, and the brand mark's top button. Orange text appears only on ink (6.27:1); on paper it fails contrast (2.37:1), so on paper orange is a fill with ink text on it.

### Neutral
- **Newsprint Cream** (paper): the page. Also the text and button fill on ink spreads.
- **Deep Newsprint** (paper-deep): the unselected thumb-index tab, the scrollbar track. A second paper stock, not a card surface.
- **Press Ink** (ink): body text, headlines, heavy rules, the ink spreads (member works, hotline, live news, footer, score-box head, cover story band), the html background behind the page, and the focus outline on paper.
- **Soft Ink** (ink-soft): secondary reading text such as deks, blurbs and the header strip (9.42:1 on paper).
- **Muted Ink** (ink-mute): folios, bylines, meta lines, reviewer handles (5.63:1 on paper, 5.00:1 on paper-deep).
- **Rule Ink** (rule): the 4px and 1px structural lines. It is the same value as Press Ink under a separate name so rules can be restyled independently.
- **Soft Rule** (rule-soft): the light hairline between stacked news items inside a column.
- **Ink-Side Cream** (on-ink): text and heavy rules on ink spreads. Same value as Newsprint Cream.
- **Ink-Side Mute** (on-ink-mute): secondary text on ink spreads (7.12:1 on ink).
- **Ink-Side Rule** (ink-rule): 1px hairlines on ink spreads.

Two translucent inks are reused as materials rather than colors: the halftone dot screen (ink at 30%, multiplied over pictures) and the REC timecode chip (ink at 82%).

### Named Rules
**The Always-Recording Rule.** Orange marks only what is live or new right now, plus the REC dot. It never decorates headings, links, borders, hover states, or section furniture. If a thing is not on air, just landed, or recording, it is ink.

**The Two-Ink Rule.** Every surface is either paper or ink. A spread that needs emphasis inverts to ink; it does not get a tint, a gradient, or a third background.

## Typography

**Display Font:** Noto Sans TC (with PingFang TC, Heiti TC, sans-serif)
**Body Font:** Archivo (with Noto Sans TC for CJK glyphs)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** A blunt, black CJK grotesque does the shouting; a variable-width Latin grotesque carries the English wordmark and condensed section tags; a monospace sets every number the way a magazine sets folios and timecodes.

The body stack is Archivo first, so Latin and numerals in running text set in Archivo while every Chinese glyph falls through to Noto Sans TC. Components that are mostly Chinese (headlines, deks, buttons, nav) set Noto Sans TC directly.

### Hierarchy
- **Display** (Noto Sans TC 900, clamp 5.5rem to 12rem, line-height 1): the single giant cover word, printed in two inks where it crosses the cover plate edge. One per issue.
- **Masthead** (Archivo 900, clamp 40px to 100px on the cover, tracked -0.035em): the English wordmark beside the brand mark. Smaller (clamp 26px to 36px) on inner pages.
- **Headline** (Noto Sans TC 900, clamp 2.25rem to 5rem, line-height 1): section heads (新聞快報, 試玩評測, 成員作品). Article titles run slightly smaller (clamp 2rem to 4.25rem, line-height 1.22).
- **Title** (Noto Sans TC 900, clamp 1.375rem to 1.75rem, line-height 1.2): work card and cover story titles. Spread and lead-work titles scale up to 2.875rem and 3.5rem.
- **Body** (Archivo with Noto fallback, 1rem, line-height 1.75): default running text. Deks and hotline copy step up to 1.0625rem at 1.75 to 1.8.
- **Body Read** (Noto Sans TC 400, 1.125rem, line-height 1.95, max 38em): long-form article body, with a 3.4em drop initial on the first paragraph.
- **Latin Tag** (Archivo 800, condensed to 70 to 75% width, uppercase, tracked 0.04 to 0.08em): the English companion to a Chinese heading (NEWS, REVIEW, MADE BY MEMBERS) and work subtitles. Always inline after or directly below its heading, never above it.
- **Label** (JetBrains Mono 700, 11 to 12px, tabular numerals): folios, dates, handles, bylines, the REC timecode, chip meta.
- **Numeral** (JetBrains Mono 700, line-height 1, tracked -0.04em): contents-page numbers (1.75rem) and cross-review scores (up to 3.25rem).
- **Tagline** (JetBrains Mono 700, tracked 0.32em in the header strip, 0.5em in the footer): ONE BUTTON IS ALWAYS RECORDING.

### Named Rules
**The Unbroken Word Rule.** Chinese headings never break inside a word. Headlines and titles are segmented into words that each stay on one line, punctuation stays attached to the word before it, and headings use strict line breaking and `text-wrap: pretty`. A title with a full-width colon breaks after the colon.

**The Folio Rule.** Every section head carries its folio: page number and issue date in mono, right-aligned on the same line as the title, above the heavy rule.

## Layout

A centered page up to 1480px wide with a fluid gutter (16px to 40px). On screens 1024px and wider the page reserves a 52px rail on its right edge for the thumb-index tabs. Spreads use a 12-column grid with a fluid column gap (16px to 28px): the cover plate takes 8 columns with the hotline and contents in the remaining 4; news runs a 4-column lead beside an 8-column, two-column text flow separated by a hairline column rule; the review spread splits 7 and 5; the member-works spread gives the lead work 8 columns spanning two rows. Sections are separated by a large fluid gap (72px to 140px). Ink spreads run full-bleed across the viewport while their content stays on the page grid.

Responsive steps: at 1100px the cover plate and side column stack, and the side column becomes two columns; at 1023px the thumb tabs leave the edge and become a sticky five-tab strip under the masthead; at 900px every spread collapses to one column and the article shelf stacks; at 760px the tagline and vertical Chinese name leave the masthead; at 640px the cover lines are hidden and news becomes a single column; at 560px the score box drops to two by two and the Latin tag moves under its heading; at 420px the tab page numbers disappear.

## Elevation & Depth

Flat. There are no drop shadows anywhere. Depth is made the way a printed magazine makes it: by inverting the page to a full ink spread, by the weight of a rule (4px structural, 3px on boxed items like the score box, 1px hairline between entries), by the halftone screen multiplied over pictures, and by a translucent-ink chip carrying the REC timecode over a picture. The only shadow-like value in the build is the cross-review 試玩推薦 seal, a rubber stamp drawn with a double inset ring and rotated -6deg; it is a printed stamp, not elevation.

### Named Rules
**The Print-Not-Lift Rule.** Surfaces never float. Emphasis comes from inversion to ink or a heavier rule, and interaction moves things along the page plane (a tab slides out 6 to 10px, a cover line nudges 4px, contents rows shift 6px), never toward the viewer.

## Shapes

Square by default: panels, chips, cover lines, the score box, pictures and rules all have hard corners. Roundness is reserved for shapes that come from the brand mark: the viewfinder brackets (6px corner radius, 3px stroke, 2px on small thumbs), the Discord join button (full pill), the REC, live and status dots (circles), and the thumb-index tabs, which are die-cut with a 10px radius on the page-facing side only and sit flush against the viewport edge. The cross-review seal carries a 4px radius as a stamp. Pixel-art plates render with `image-rendering: pixelated` so their pixels stay square.

## Components

### Buttons
Tactile and single-purpose: the only true button is the one that joins the Discord.
- **Shape:** full pill (999px) with a 3px border in the fill color.
- **Primary (ink):** ink fill, cream Noto Sans TC 900 label at 1.0625rem, 48px tall, 16px left and 20px right padding, an orange 14px dot leading the label and a 16px stroked arrow trailing it. Large size is 60px tall at 1.25rem.
- **Paper:** the inverse, cream fill with ink label, used on ink spreads (hotline, footer).
- **Hover / Focus:** fill and label swap between ink and paper over 160ms linear; press nudges down 1px and scales to 0.98 on the snap curve. Focus is the global 3px outline, offset 3px, ink on paper and cream on ink.
- **Text link ("more"):** Noto 900 with a 3px underline border and a chevron drawn from two 3px borders; the chevron slides 4px on hover.

### Chips
- **Work meta chip:** ink block with cream mono label (11px, 700), square, pinned to the bottom-left of a work picture.
- **Status chip:** orange fill with ink Noto 900 text (直播中 or NEW), square, set flush inside the meta chip or before a row's meta line.
- **News tag:** 1.5px current-color outline, square, 0.08em tracking, mute ink.

### Cards / Containers
- **Corner Style:** square.
- **Background:** none on paper; the work card is a picture over a text block with no frame. Emphasized containers invert to ink (hotline, live news item, article side card) with 20 to 24px padding.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** entries are separated by hairlines, not boxed. Only the cross-review box is fully boxed (3px ink).
- **Internal Padding:** 22px 22px 24px on ink panels; 12px above work card text.

### Navigation
- **Thumb-index tabs:** five tabs (封面, 新聞, 專題, 作品, 加入) with mono page numbers. On desktop they are fixed to the right viewport edge, vertical-set in Noto 900 at 17px with 0.24em tracking, deep-newsprint fill with a 2px ink border open on the right. Hover slides a tab out 6px; the current tab inverts to ink and sits 10px further out. Below 1024px they become a sticky five-column strip under the masthead, 48px tall, paper fill with 1px ink dividers and a 2px ink bottom rule; the current tab is ink.
- **Contents list:** mono page numbers at 1.75rem in a 3.2rem column beside a Noto 700 entry with a small mute sub-line; 1px rules between rows; the row shifts 6px on hover.
- **Masthead:** a strip with volume and date in mono, the sample notice, and the spaced tagline, over a 1px rule; then the brand mark and wordmark, with the vertical Chinese name at the far right on the cover. A 4px rule closes the masthead.

### Viewfinder (signature)
Four corner brackets drawn from the brand mark (3px stroke, 6px radius, inset 10px, length 12% of the frame between 14px and 34px) sit invisible 14px outside each corner. On hover, keyboard focus of the owning link, or 75% visibility on a touch screen, they snap into place on the 220ms ease-out-expo curve while a REC chip fades in: an orange dot blinking once a second and a running mono timecode (MM:SS:FF at 30fps) on 82% ink. Live items hold the REC chip on permanently. Reduced motion freezes the timecode and the blink.

### Cover Plate (signature)
A 2:1 halftoned plate spanning 8 columns. The giant cover word overlaps its top edge and is printed twice, clipped so the part above the plate is ink and the part on the plate is cream. Up to three cover lines (cream blocks, Noto 900 at 0.9375rem, mono page reference) stack at the plate's top-right. The cover story title sits in an ink band directly under the plate with a mono byline.

### Cross Review (signature)
The four-reviewer score box: a 3px ink frame, an ink head with 交叉評測, the total in mono and an optional 試玩推薦 stamp when the total clears 75%, then four columns split by 1px ink rules, each with a large mono score and the reviewer handle.

## Do's and Don'ts

### Do:
- **Do** keep every surface paper (#eeeae0) or ink (#18171c); invert a whole spread to ink when a section needs weight.
- **Do** reserve Recording Orange (#ff6b2c) for live items, new items, and the REC dot; set orange text only on ink.
- **Do** close each section head with a 4px ink rule and a mono folio (page number and issue date).
- **Do** put pictures through the halftone screen and leave pixel-art plates pixelated.
- **Do** use the 220ms ease-out-expo snap (cubic-bezier(0.16, 1, 0.3, 1)) for movement, and 120 to 160ms linear for color and opacity.
- **Do** keep Chinese headings whole: segment by word and break after a full-width colon.
- **Do** use the viewfinder brackets, not a scale or glow, as the hover and focus response for pictures.

### Don't:
- **Don't** use drop shadows or lift cards off the page; the build has none.
- **Don't** introduce a second accent color or use orange for links, hover states, headings, or decoration.
- **Don't** round square furniture (panels, chips, pictures, the score box); rounded shapes come only from the brand mark and its derivatives (viewfinder brackets, dots, the pill join button, the thumb-tab die cut, the review stamp).
- **Don't** add entrance animations or scroll-triggered reveals; motion responds to hover, focus, and live state only.
- **Don't** set orange text on paper; it fails contrast at 2.37:1.
