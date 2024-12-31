import { FormService } from "../FormService.ts";
import { assertEquals } from "jsr:@std/assert";
import { relativePath } from "../../../utils/relativePath.ts";
import { parse as CsvParse } from "@std/csv/parse";
import { Transaction } from "../types.ts";

/**
 * Set up
 */
const transactionContent = await Deno.readFile(
  relativePath(import.meta.url, "transactions.csv"),
);
const testFile = new File([transactionContent], "sample_td.csv", {
  type: "text/csv",
});

const formatContent = await Deno.readTextFile(
  relativePath(import.meta.url, "format.json"),
);
const decoder = new TextDecoder("utf-8");

/**
 * Global Vars
 */
const TEST_TRANSACTIONS = CsvParse(decoder.decode(transactionContent), {
  skipFirstRow: false,
});
const TEST_FORMAT = JSON.parse(formatContent);
const FORM_SERVICE = new FormService(testFile);

Deno.test("_serialize method", async () => {
  const result = FORM_SERVICE._serialize(TEST_FORMAT, TEST_TRANSACTIONS);
  assertEquals(result, [
    {
      date: new Date("12/27/2024"),
      description: "AMZN Mktp CA*Z95XQ1ID1",
      amount: 17.91,
      total_balance: 779.49,
    },
    {
      date: new Date("12/24/2024"),
      description: "Subway 11300",
      amount: 13.07,
      total_balance: 761.58,
    },
  ] as Transaction[]);
});
