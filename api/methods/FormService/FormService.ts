import { Bank } from "./types.ts";

/**
 * Handles the content of the csv file. 
 */
export class FormService {
    public file: File | undefined;
    public transactions: string | undefined;
    public bank: Bank | undefined;
    public account: string | undefined


    constructor(file: File) {
        this.file = file;
    }

    async parseFile () {
        await this.extractTransactions(this.file);
        this.serializeTransactions()
    }

    private async extractTransactions (file: File | undefined) {
        if(file) {
            this.transactions = await file.text();
        } else {
            throw new Error("No file detected. Expected a csv file.")
        }
    }

    /**
     * Remove unused column entries, keeps only the necessary ones
     */
    private serializeTransactions() {
        
    }

}