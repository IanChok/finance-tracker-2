import { findIndex } from "../../utils/findIndex.ts";
import { logger } from "../../utils/logger.ts";
import { PROJECT_ROOT } from "../../utils/projectRootUrl.ts";
import { AiService } from "../AiService/AiService.ts";
import { Bank, Transaction } from "./types.ts";
import { parse as CsvParse } from "@std/csv/parse";

/**
 * Handles the content of the csv file.
 */
export class FormService {
  file: File;
  transactions: Transaction[] | undefined;
  bank: Bank | undefined;
  account: string | undefined;

  constructor(file: File) {
    this.file = file;
  }

  async parseFile() {
    const transactions = await this.extractTransactions(this.file);

    const parsedResult = await this.parseTransactions(transactions);
    if (!parsedResult) return;
    const { TD_FORMAT, parsedTransactions } = parsedResult;

    const serializedTransactions = this.serializeTransactions(
      TD_FORMAT,
      parsedTransactions,
    );

    const categorizedTransactions = this.categorizeTransactions(
      serializedTransactions,
    );

    this.transactions = categorizedTransactions;
  }

  async extractTransactions(file: File | undefined): Promise<string> {
    if (file) {
      return await file.text();
    } else {
      throw new Error("No file detected. Expected a csv file.");
    }
  }

  async parseTransactions(transactions: string) {
    if (!transactions.trim()) {
      return logger(
        "WARN",
        "Transaction records are empty! Expected at least one transaction in csv.",
      );
    }

    const content = await Deno.readTextFile(
      PROJECT_ROOT + "/api/methods/FormService/formats/td.json",
    );
    const TD_FORMAT = JSON.parse(content);

    const parsedTransactions = CsvParse(transactions, { skipFirstRow: false });
    if (parsedTransactions.length === 0) {
      return logger(
        "WARN",
        "Transaction records are empty! Expected at least one parsed row of the csv, but got none.",
      );
    }

    return { TD_FORMAT, parsedTransactions };
  }

  serializeTransactions(
    format: string[],
    transactions: string[][],
  ): Transaction[] {
    const [dateKey, descriptionKey, amountKey, total_balanceKey] = [
      "date",
      "description",
      "amount",
      "total_balance",
    ].map((key: string) => findIndex(format, key));
    return transactions.map((transaction) => {
      const date = new Date(transaction[dateKey]);
      const description = transaction[descriptionKey];
      const amount = Number(transaction[amountKey]);
      const total_balance = Number(transaction[total_balanceKey]);

      const id = this.generateTransactionKey(
        date.toISOString(),
        description,
        amount,
      );

      return {
        id,
        date,
        description,
        amount,
        total_balance,
      } as Transaction;
    });
  }

  generateTransactionKey(
    date: string,
    description: string,
    amount: string | number,
  ): string {
    return `${date}-${description}-${amount}`;
  }

  categorizeTransactions(transactions: Transaction[]) {
    const sanitized = this.filterFieldsForGPT(transactions)
    const aiService = new AiService();
    aiService.categorizeTransactions(sanitized)
    return transactions;
  }

  filterFieldsForGPT(transactions: Transaction[]) {
    return transactions.map(({ id, description }) => ({ id, description }));
  }
}
