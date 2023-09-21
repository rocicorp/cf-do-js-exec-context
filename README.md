# cf-do-js-exec-context

A test Cloudflare worker and durable object which demonstrates that
wrangler dev uses a single JavaScript execution context for workers and
Durable Objects of different classes and/or ids. This behavior differs from
the deployed behavior.

**Response from `wrangler dev` looks like:**

```
Worker js exec context id: snfxxmas
DOClass1 foo response: DO id: znr0fq82, js context id: snfxxmas
DOClass2 bar response: DO id: z3a83ub6, js context id: snfxxmas
DOClass1 foo response: DO id: znr0fq82, js context id: snfxxmas
DOClass2 bar response: DO id: z3a83ub6, js context id: snfxxmas
```

Indicating the worker and Durable Object instances are all sharing the same
JavaScript execution context.

**Response from `wrangler dev --remote` looks like:**

```
Worker js exec context id: q5q0i2xk
DOClass1 foo response: DO id: cahimg3f, js context id: tk2dp2f
DOClass2 bar response: DO id: jfn3p28p, js context id: tk2dp2f
DOClass1 foo response: DO id: cahimg3f, js context id: tk2dp2f
DOClass2 bar response: DO id: jfn3p28p, js context id: tk2dp2f
```

Indicating the worker has its own JavaScript Execution Context and the Durable
Object instances are sharing the same JavaScript execution context.

**Response from `wrangler publish` output looks like:**

```
Worker js exec context id: l7xrtr9j
DOClass1 foo response: DO id: fci8u6tn, js context id: j8q3vagr
DOClass2 bar response: DO id: pwdem3v, js context id: 0jf132k
DOClass1 foo response: DO id: fci8u6tn, js context id: j8q3vagr
DOClass2 bar response: DO id: pwdem3v, js context id: 0jf132k
```

Indicating the worker and Durable Object instances are all in different
JavaScript execution contexts.

## Running Locally

```bash
npm install

npx wrangler dev
```

Then open http://localhost:8787?name1=foo&name2=bar in your browser of choice.

## Running on Cloudflare

```
npm install

npx wrangler publish
```

Then open the url for the worker output by the above wrangler publish command.
Like https://cf-do-js-exec-context-test.my-team.workers.dev?name1=foo&name2=bar
