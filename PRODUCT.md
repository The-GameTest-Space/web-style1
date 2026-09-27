# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Prospective members**: gamers who arrive from a search result, a shared link, or social media, and need to understand within seconds what this community is and why to join its Discord.
- **Existing members** of the Discord server 遊戲測試的地方 GameTestSpace: they come back to read new articles and news, and to discover (or promote) work made by other members.
Both audiences carry equal weight (confirmed). The site reads like an ongoing publication, with a way into the Discord always within reach.

## Product Purpose
A public, static website for the GameTestSpace community. It publishes three kinds of content:
1. **Articles**: game-related features, reviews, and essays.
2. **News**: short game-industry and community news.
3. **Member showcase**: promotion of game content made by community members. Confirmed types: indie games and demos (itch.io, Steam links), videos and streams, mods, maps, and levels, and art or fan work.
Success means visitors read and come back, members get real exposure for their work, and newcomers join the Discord.

## Positioning
The website is a community-run test space, not a mainstream games media outlet: its content comes from people who play, test, and make games themselves, and member-made work gets the same editorial weight as industry news.

## Operating Context
- The community lives on Discord (server "遊戲測試的地方 GameTestSpace", guild id 1260814281222520842). A sibling repo `../discord-bot` holds the bot, an operator console, and a Go backend API (scaffolded).
- Content is in Traditional Chinese (zh-TW); the brand name and tagline are in English.

## Capabilities and Constraints
- Stack: Vue 3 + Vite + vue-router + TypeScript (existing scaffold). MSW is set up for mocking API data in dev.
- The site is static: no user accounts, no comments, no submissions on the site itself. Submissions and discussion happen on Discord.
- No real content exists yet (confirmed). Use clearly marked sample content, shaped so that it can later be served from the backend API.
- Public Discord invite: https://discord.gg/yXfKQpAPN (confirmed 2026-09-27).
- Undecided: social links, the content submission process, and the hosting target.

## Brand Commitments
- Name: **The Game Test Space** / GameTestSpace / 遊戲測試的地方.
- Tagline: **"ONE BUTTON IS ALWAYS RECORDING"**.
- Mark: a camera viewfinder (four rounded corner brackets) framing a four-button game-controller diamond; the top button is orange (the "recording" button) and the other three are ink or cream.
- Existing brand colors from the logo files: warm cream, near-black ink, and signal orange. Heavy grotesque wordmark, and a spaced monospace tagline.
- Assets: `/Users/attitude/Pictures/GTSpace/`, which contains horizontal logos (dark and light), IG avatars (dark, light, and with text), and a brand sheet.

## Evidence on Hand
- Logo and brand sheet only. There are **no** real articles, news, member works, member counts, testimonials, or partner claims. Future work must not fabricate these as real; sample content must read as sample content.

## Product Principles
1. Member work is first-class: showcase entries are not ads in a sidebar, and they stand next to editorial content as equals.
2. Always one step from Discord: every page offers a clear, non-nagging way to join.
3. Publication first: reading comfort and scanability of new content come before decoration.
4. Honest about scale: never inflate the community with invented numbers or endorsements.

## Accessibility & Inclusion
WCAG 2.2 AA as baseline; CJK text readability (line-height, measure) matters for zh-TW content.
