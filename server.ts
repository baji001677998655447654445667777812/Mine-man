import { execFile } from 'node:child_process';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

function runPythonService(
  args: string[],
  stdinPayload?: string
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = execFile(
      'python3',
      ['-m', 'backend.portfolio_service', ...args],
      { cwd: __dirname, timeout: 5000 },
      (error, stdout, stderr) => {
        const exitCode =
          error && typeof (error as NodeJS.ErrnoException & { code?: number }).code === 'number'
            ? Number((error as NodeJS.ErrnoException & { code?: number }).code)
            : error
              ? 1
              : 0;
        resolve({ code: exitCode, stdout, stderr });
      }
    );
    if (stdinPayload !== undefined && child.stdin) {
      child.stdin.write(stdinPayload);
      child.stdin.end();
    }
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', async (_req, res) => {
    const result = await runPythonService(['health']);
    if (result.code !== 0) {
      res.status(500).json({ status: 'error', detail: result.stderr || 'Python bridge error' });
      return;
    }
    res.type('application/json').send(result.stdout);
  });

  app.get('/api/portfolio', async (_req, res) => {
    const result = await runPythonService(['portfolio']);
    if (result.code !== 0) {
      res.status(500).json({ error: 'Unable to load portfolio data from Python service' });
      return;
    }
    res.type('application/json').send(result.stdout);
  });

  app.get('/api/projects', async (req, res) => {
    const category = typeof req.query.category === 'string' ? req.query.category : 'All';
    const result = await runPythonService(['projects', category]);
    if (result.code !== 0) {
      res.status(500).json({ error: 'Unable to filter projects from Python service' });
      return;
    }
    res.type('application/json').send(result.stdout);
  });

  app.get('/api/contact/messages', async (_req, res) => {
    const result = await runPythonService(['contacts']);
    if (result.code !== 0) {
      res.status(500).json({ error: 'Unable to load contact messages' });
      return;
    }
    res.type('application/json').send(result.stdout);
  });

  app.post('/api/contact', async (req, res) => {
    const bodyText = JSON.stringify(req.body ?? {});
    const result = await runPythonService(['submit-contact'], bodyText);
    if (result.code === 2) {
      res.status(422).type('application/json').send(result.stdout);
      return;
    }
    if (result.code !== 0) {
      res.status(500).json({ error: 'Unable to process contact request' });
      return;
    }
    res.status(201).type('application/json').send(result.stdout);
  });

  if (isProduction) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        next();
        return;
      }
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        const template = fs.readFileSync(indexPath, 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        next(err);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
