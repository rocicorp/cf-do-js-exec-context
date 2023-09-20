# cf-do-js-exec-context

A test Cloudflare worker and durable object which demonstrates that
wrangler dev uses a single JavaScript execution context for workers and
Durable Objects of different classes and/or ids. This behavior differs from
the deployed behavior.

## Running Locally

```bash
npm install

wrangler dev

# Then open http://localhost:8787 in your browser of choice.
```

## Running on Cloudflare

```
npm install

wrangler publish

# Then open the url for the worker output by the above wrangler publish command.
```
