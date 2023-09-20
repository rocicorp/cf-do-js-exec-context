export interface Env {
  doClass1: DurableObjectNamespace;
  doClass2: DurableObjectNamespace;
}

const randomID = () => Math.random().toString(36).substring(5);
const jsExecContextID = randomID();

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const doName1 = url.searchParams.get("name1");
    if (!doName1) {
      return new Response("Missing name1", { status: 400 });
    }
    const doName2 = url.searchParams.get("name2");
    if (!doName2) {
      return new Response("Missing name2", { status: 400 });
    }
    console.log(
      "worker",
      JSON.stringify([...request.headers.entries()], undefined, 2)
    );
    const responseText = `Worker js exec context id: ${jsExecContextID}
DOClass1 ${doName1} js exec context id: ${await (
      await env.doClass1.get(env.doClass1.idFromName(doName1)).fetch(request)
    ).text()}
DOClass2 ${doName2} js exec context id: ${await (
      await env.doClass2.get(env.doClass2.idFromName(doName2)).fetch(request)
    ).text()}`;
    return new Response(responseText);
  },
};

class DOClass1 implements DurableObject {
  async fetch(request: Request): Promise<Response> {
    return new Response(jsExecContextID);
  }
}

class DOClass2 implements DurableObject {
  async fetch(request: Request): Promise<Response> {
    return new Response(jsExecContextID);
  }
}

export { worker as default, DOClass1, DOClass2 };
