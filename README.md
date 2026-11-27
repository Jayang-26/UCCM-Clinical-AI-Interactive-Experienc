# UCCM Clinical AI Kiosk — Final VS Code Source

This is the complete front-end source project for the Universal Cornea Care Mission kiosk experience. It is intended to be opened and edited directly in Visual Studio Code.

## Final navigation

- Home screen: compact UCCM mission logo, UCCM name, and the catchline “Clear sight should not depend on where you live.”
- Three home experiences retain the supplied Infection, Keratoconus, and Keratoplasty logos.
- Infection → Model 1 → Case A/B/C; each case launches its matching video immediately on one tap.
- Infection → Model 2 → Case A/B; each case launches its matching video immediately on one tap.
- Infection → Model 3 launches its video directly.
- Keratoconus → Case A/B/C; each case launches its matching video immediately on one tap.
- KPOP launches its workflow video directly.
- Back navigation is available on selection and playback screens.
- Video playback is muted and inline by default. Full screen / minimize is provided. When a video ends, the app returns to the home screen.

## Project structure

```text
UCCM_KERACON_Full_Experience/
├── index.html
├── styles.css
├── app.js
├── config.js
├── manifest.webmanifest
├── service-worker.js
├── icons/
├── assets/
│   ├── logos/
│   ├── models/
│   └── cases/
└── videos/
```

## Required video files

The original MP4 video files were not present in the source files available for this final package. The application code and all supplied image assets are included; add the ten MP4s below to `videos/` to enable complete playback. Keep the filenames exactly as shown.

| Experience | Exact filename |
|---|---|
| Infection — Model 1 — Case A | `infection_model1_case_a.mp4` |
| Infection — Model 1 — Case B | `infection_model1_case_b.mp4` |
| Infection — Model 1 — Case C | `infection_model1_case_c.mp4` |
| Infection — Model 2 — Case A | `infection_model2_case_a.mp4` |
| Infection — Model 2 — Case B | `infection_model2_case_b.mp4` |
| Infection — Model 3 | `infection_model_3.mp4` |
| Keratoconus — Case A | `keratoconus_video_1.mp4` |
| Keratoconus — Case B | `keratoconus_video_2.mp4` |
| Keratoconus — Case C | `keratoconus_video_3.mp4` |
| KPOP workflow | `kpop_workflow.mp4` |

Do not rename the files unless you also update the matching `video` entries in `config.js`.

## Run on Windows in VS Code

1. Extract the ZIP.
2. In VS Code choose **File → Open Folder** and select `UCCM_KERACON_Full_Experience`.
3. Open **Terminal → New Terminal**.
4. Run:

```powershell
python -m http.server 8000 --bind 0.0.0.0
```

5. Open `http://localhost:8000` in Chrome or Edge.
6. For a tablet on the same Wi-Fi, use `http://YOUR-PC-IP:8000` (find the IPv4 address with `ipconfig`). Keep the server terminal open. Press `Ctrl+C` to stop it.

## GitHub Pages

Upload the contents of this project folder to the root of your repository. In GitHub, open **Settings → Pages → Deploy from a branch**, choose `main` and `/(root)`, then save.

## Important

This is a static kiosk interface and pre-recorded video player. It does not execute the clinical AI models or connect to a model server. Before a conference, test every MP4 on the actual tablet and wall display, including offline/local playback. Do not publish identifiable patient information in a public repository.
