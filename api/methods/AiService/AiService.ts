import OpenAI from "npm:openai";
import { logger } from "../../utils/logger.ts";
import { SpendingCategory, Transaction } from "../FormService/types.ts";

const CATEGORIZE_TRANSACTIONS_DEVELOPER_PROMPT = `
You are to categorize the users spending transactions.
Given an array of objects, simply guess the category of each object based on the description. 
Return only an array of objects of the following format: \`{"id": <id of the object>, "category": SpendingCategory.<spending category option>}\`
Below is a list of the SpendingCategory options.
\`\`\`
${Object.keys(SpendingCategory)}
\`\`\`

Example response: \`[{"id": "123", "category": SpendingCategory.Hobbies}]\`.
`;

/**
 * Handles AI related tasks.
 * Currently uses ChatGPT api
 */
export class AiService {
  openai;

  constructor() {
    this.openai = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });
  }

  async sendPrompt(developerPrompt: string, userPrompt: string) {
    logger("DEBUG", "Sending chatgpt transactions input", userPrompt);
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "developer",
            "content": [
              {
                "type": "text",
                "text": developerPrompt,
              },
            ],
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": userPrompt,
              },
            ],
          },
        ],
      });

      const response = completion.choices[0].message.content;
      logger("DEBUG", "ChatGPT response", response);
      return response;
    // deno-lint-ignore no-explicit-any
    } catch (err: any) {
      logger("ERROR", "Unable to send chatgpt input", err.message);
    }
  }

  categorizeTransactions(
    transactions: Pick<Transaction, "id" | "description">[],
  ) {
    this.sendPrompt(
      CATEGORIZE_TRANSACTIONS_DEVELOPER_PROMPT,
      JSON.stringify(transactions),
    );
  }
}
