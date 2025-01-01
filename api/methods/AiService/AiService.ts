import OpenAI from "npm:openai";

/**
 * Handles AI related tasks. 
 * Currently uses ChatGPT api
 */
export class AiService {
    openai;

    constructor() {
        this.openai = new OpenAI({
            apiKey: Deno.env.get("OPENAI_API_KEY")
        })
    }


    async sendPrompt() {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "developer", content: "You extract email addresses into JSON data." }
            ],
            response_format: {
                // See /docs/guides/structured-outputs
                type: "json_schema",
                json_schema: {
                    name: "email_schema",
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                description: "The email address that appears in the input",
                                type: "string"
                            }
                        },
                        additionalProperties: false
                    }
                }
            }
        });
    }
}