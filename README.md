# cf-do-js-exec-context

A test Cloudflare worker and durable object which demonstrates that
wrangler dev uses a single JavaScript execution context for workers and
Durable Objects of different classes and/or ids. This behavior differs from
the deployed behavior.

Response from `wrangler dev` looks like:

```
Worker js exec context id: c6zbo9fi.
DOClass1 foo js exec context id: c6zbo9fi
DOClass2 bar js exec context id: c6zbo9fi
```

Indicate the worker and Durable Object instances are all sharing the same
JavaScript execution context.

Response from `wrangler publish` output looks like:

```
Worker js exec context id: 1zjijuk4.
DOClass1 foo js exec context id: 6ykzlud9
DOClass2 bar js exec context id: b42fguz4
```

Indicating the worker and Durable Object instances are all in different
JavaScript execution contexts.

## Running Locally

```bash
npm install

wrangler dev

# Then open http://localhost:8787?name1=foo&name2=bar in your browser of choice.
```

## Running on Cloudflare

```
npm install

wrangler publish

# Then open the url for the worker output by the above wrangler publish command.
# Like https://cf-do-js-exec-context-test.my-team.workers.dev?name1=foo&name2=bar
```
