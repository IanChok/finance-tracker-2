import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { FormService } from "./methods/FormService/FormService.ts";
import { RecordService } from "./methods/RecordService/RecordService.ts";

const router = new Router();

/**
 * TODO: List all the available API methods in the returned HTML
 */
router.get("/", (ctx) => {
    ctx.response.body = `<!DOCTYPE html>
      <html>
        <head><title>Server</title><head>
        <body>
          <h1>Hello from Server!</h1>
        </body>
      </html>
    `;
  });


router.post("/upload", async (ctx) => {
    const data = await ctx.request.body.formData()
    const file = data.get('file') as File;

    const formService = new FormService(file)
    await formService.parseFile();
    
    const recordService = new RecordService()
    recordService.addEntry(formService.transactions ?? "")
    
    ctx.response.body = await recordService.displayEntries()
})

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });