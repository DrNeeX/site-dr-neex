import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: '.',
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/request-access' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              const email = payload.email;

              // Basic server-side email format check
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!email || !emailRegex.test(email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'error', message: 'Email invalide.' }));
                return;
              }

              // Path to output file
              const filePath = path.resolve(process.cwd(), 'leads.json');
              let leads = [];

              if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                try {
                  leads = JSON.parse(fileContent);
                  if (!Array.isArray(leads)) {
                    leads = [];
                  }
                } catch (e) {
                  leads = [];
                }
              }

              // Avoid duplicates
              if (!leads.includes(email)) {
                leads.push(email);
                fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'success', message: 'Email enregistré avec succès.' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ status: 'error', message: 'Erreur interne du serveur.' }));
            }
          });
        } else {
          next();
        }
      });
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        lightgen: './dr-lightgen.html',
        rbackground: './dr-rbackground.html',
        librarypro: './dr-library-pro.html',
        pricing: './pricing.html'
      }
    }
  }
});

