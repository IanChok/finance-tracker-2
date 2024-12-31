import { logger } from "../../utils/logger.ts";
import { PROJECT_ROOT } from "../../utils/projectRootUrl.ts";
import { FormService } from "../FormService/FormService.ts";
import { Transaction } from "../FormService/types.ts";

// TODO: Update to only point to dir, not individual file.
const RECORDS_PATH = PROJECT_ROOT + "/assets/records/entry.json";
const UPLOADS_PATH = PROJECT_ROOT + "/assets/uploads/entry.json";

/**
 * Manages all entries of a particular account
 */
export class RecordService {
  public account: string | undefined;
  public formService: FormService | undefined;

  constructor(formService?: FormService) {
    this.formService = formService;
  }

  /**
   * Appends new entries to an account.
   * Removes duplicates if any.
   * @param csv data to append
   */
  async addEntry() {
    if(!this.formService) {
        return logger("WARN", "Missing formService instance.")
    }
    if (!this.formService.transactions?.length) {
      return logger(
        "WARN",
        "Cannot add transaction entry, as it is empty! Expected at least one transaction.",
      );
    }
    logger("INFO", "Adding new csv entry", `${RECORDS_PATH}`);
    const userUploadContent = await this.formService.file.text()
    await Deno.writeTextFile(RECORDS_PATH, userUploadContent)

    await Deno.writeTextFile(
      RECORDS_PATH,
      JSON.stringify(this.formService.transactions, null, 2),
    );
  }

  /**
   * Returns the finance csv entries to display
   */
  async displayEntries() {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(RECORDS_PATH);
    if (!data) {
      logger("WARN", "No data was found!", `At ${RECORDS_PATH}`);
    }
    return decoder.decode(data);
  }
}
