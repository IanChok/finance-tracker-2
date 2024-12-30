import { logger } from "../../utils/logger.ts";
import { PROJECT_ROOT } from "../../utils/projectRootUrl.ts";

// TODO: Update to only point to dir, not individual file. 
const RECORDS_PATH = PROJECT_ROOT + '/assets/uploads/entry.csv'

/**
 * Manages all entries of a particular account
 */
export class RecordService {
    public account: string | undefined;

    constructor(){}

    /**
     * Appends new entries to an account.
     * Removes duplicates if any. 
     * @param csv data to append
     */
    async addEntry(csv: string) {
        logger("INFO", "Adding new csv entry", `${RECORDS_PATH} -> ${csv}`)
        await Deno.writeTextFile(RECORDS_PATH, csv)
    }

    /**
     * Returns the finance csv entries to display
     */
    async displayEntries() {
        const decoder = new TextDecoder("utf-8");
        const data = await Deno.readFile(RECORDS_PATH);
        if(!data) {
            logger("WARN", "No data was found!", `At ${RECORDS_PATH}`)
        }
        return decoder.decode(data)
    }
}