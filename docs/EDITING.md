# Editing portfolio content

- Update project objects in `src/data/projects.js`; the grid and recruiter brief use that list.
- Set a project's `featured`, `categories`, `status`, `links`, and `order` in the same object.
- Add confirmed awards, coding profiles, certificates, or internships in `src/data/portfolio.js`.
- Leave unavailable details empty; empty project links, images, and achievement arrays are hidden.
- Put project preview images in `public/projects/` and reference them as `/projects/filename.png`.
- Put certificate PDFs or images in `public/certificates/` and add their confirmed metadata.
- Add your resume PDF at `public/resume/Mannan_Maheshwari_Resume.pdf`.
- To update it later, replace that PDF with the new version using the exact same filename; the Resume section, hero actions, recruiter brief, and preview will then use the new file.
- Resume preview and download buttons appear automatically when that PDF is available.
- To use another resume filename, change `profile.resumePath` in `src/data/portfolio.js`.
- The existing RE4-themed portrait artwork remains unchanged; use an original personal portrait if you want a personal photo.
- No project contact form is shown until a verified form endpoint is configured.
- Run `npm run build` to verify changes before deployment.
