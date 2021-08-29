export class MasterdataRecord {
    public key: string;
    public group: string;
    public description: string;
    public filter1: string;
    public filter2: string;
    public filter3: string;
    public filter4: number;
    public filter5: number;
    public filter6: number;
    public data: any;

    constructor(recordFromDevice: any) {
        this.key = recordFromDevice['key'];
        this.group = recordFromDevice['group'];
        this.description = recordFromDevice['description'];
        this.filter1 = recordFromDevice['filter1'];
        this.filter2 = recordFromDevice['filter2'];
        this.filter3 = recordFromDevice['filter3'];
        this.filter4 = Number(recordFromDevice['filter4']);
        this.filter5 = Number(recordFromDevice['filter5']);
        this.filter6 = Number(recordFromDevice['filter6']);
        this.data = recordFromDevice['data'];
    }
}
