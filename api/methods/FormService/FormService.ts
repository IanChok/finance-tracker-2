import { findIndex } from "../../utils/findIndex.ts";
import { logger } from "../../utils/logger.ts";
import { PROJECT_ROOT } from "../../utils/projectRootUrl.ts";
import { Bank, Transaction } from "./types.ts";
import { parse as CsvParse } from "@std/csv/parse";

/**
 * Handles the content of the csv file.
 */
export class FormService {
  public file: File;
  public transactions: Transaction[] | undefined;
  public bank: Bank | undefined;
  public account: string | undefined;

  constructor(file: File) {
    this.file = file;
  }

  async parseFile() {
    const transactions = await this.extractTransactions(this.file);
    await this.serializeTransactions(transactions);
  }

  async extractTransactions(file: File | undefined): Promise<string> {
    if (file) {
      return await file.text();
    } else {
      throw new Error("No file detected. Expected a csv file.");
    }
  }

  async serializeTransactions(transactions: string) {
    if (!transactions.trim()) {
      return logger(
        "WARN",
        "Transaction records are empty!. Expected at least one transaction in csv.",
      );
    }
    const content = await Deno.readTextFile(
      PROJECT_ROOT + "/api/methods/FormService/formats/td.json",
    );
    const TD_FORMAT = JSON.parse(content);
    const parsedTransactions = CsvParse(transactions, { skipFirstRow: false });
    if (parsedTransactions.length === 0) {
      return logger("WARN", "Transaction records are empty!");
    }
    this.transactions = this._serialize(TD_FORMAT, parsedTransactions);
  }

  _serialize(format: string[], transactions: string[][]) {
    const [date, description, amount, total_balance] = [
      "date",
      "description",
      "amount",
      "total_balance",
    ].map((key: string) => findIndex(format, key));
    return transactions.map((transaction) => ({
      date: new Date(transaction[date]),
      description: transaction[description],
      amount: Number(transaction[amount]),
      total_balance: Number(transaction[total_balance]),
    } as Transaction));
  }
}
