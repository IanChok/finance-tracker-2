/**
 * Handles the content of the csv file. 
 */
export class FormService {

    public file: File | undefined;
    public csv: string | undefined;

    constructor(file: File) {
        this.file = file;
    }

    async parseFile () {
        await this.extractCsv(this.file);
        this.serializeCsv()
    }

    private async extractCsv (file: File | undefined) {
        if(file) {
            this.csv = await file.text();
        } else {
            throw new Error("No file detected. Expected a csv file.")
        }
    }

    /**
     * Remove unused column entries, keeps only the necessary ones
     */
    private serializeCsv () {
        
    }


}