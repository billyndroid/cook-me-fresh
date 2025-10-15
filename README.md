# Cook Me Fresh

Simple static site for Cook Me Fresh — services, gallery and contact.

## Overview
- Static HTML/CSS site with a small client-side script to protect the phone number.
- Uses Font Awesome for icons and a responsive layout with CSS variables.
- Assets (images) live under `assets/`.

## Features
- Services section with responsive service cards and Font Awesome bullets.
- Gallery with grid and background image layer.
- Contact section with clickable phone/email CTA buttons. Phone number is assembled client-side in `scripts/phone-protection.js` to reduce scraping.
- Hero section with hero text and CTA.

## Repo structure
- `index.html` — main markup
- `styles/style.css` — primary styles (CSS variables, responsive rules)
- `styles/insta-gallery.css` — additional gallery styling
- `scripts/phone-protection.js` — dynamic phone assembly / obfuscation
- `assets/` — images (includes `olga-petnyunene-xfddixUv0k4-unsplash.jpg` and others)
- `README.md` — this file

## Local preview (Windows)
Quick ways to preview locally:

- Python 3:
  - Open PowerShell / CMD
  - cd C:\Users\sgscy\Documents\GitHub\cook-me-fresh
  - python -m http.server 8000
  - Open http://localhost:8000

- Node (npx serve):
  - cd <repo>
  - npx serve .

- VS Code:
  - Use Live Server extension for live reload.

## Development notes
- Phone number: edit `scripts/phone-protection.js` parts (countryCode, areaCode, prefix, line). The script sets `tel:` on user interaction.
- Font Awesome is loaded in `<head>` of `index.html`. Use classes like `<i class="far fa-square"></i>` for list bullets and `<i class="fas fa-phone-alt"></i>` for icons.
- CSS variables are declared in `styles/style.css` (:root). Keep consistent when adding new colors.
- Contact overlay: `assets/olga-petnyunene-xfddixUv0k4-unsplash.jpg` is used as a semi-transparent overlay in `.contact-section` via CSS pseudo-element.
- Keep button styles in `styles/style.css` when adjusting layout so hover/active styles remain consistent.

## Accessibility & testing
- Ensure `aria-label` / accessible text for icon-only buttons if added.
- Test `tel:` behavior on mobile devices; desktop browsers may not open a dialer.

## Contributing
- Edit files, test locally, open a pull request. Keep changes scoped and add short commit messages.

## License
- Add a LICENSE file if you want to publish (suggest MIT).
