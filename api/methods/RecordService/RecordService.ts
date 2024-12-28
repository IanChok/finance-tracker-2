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
    addEntry(csv: string) {
        console.log(">> csv = ", csv)
    }
}