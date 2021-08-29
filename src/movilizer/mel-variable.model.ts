export class MelVariable {
    private tagsValueMap: Map<string, any>;
    private varCache: Map<string, MelVariable>;
    private arrayCache: Map<string, Array<any>>;
    private stringArrayCache: Map<string, Array<string>>;
    private varArrayCache: Map<string, Array<MelVariable>>;

    constructor(melVariable: any) {
        this.tagsValueMap = new Map<string, any>();
        this.varCache = new Map<string, MelVariable>();
        this.arrayCache = new Map<string, Array<any>>();
        this.stringArrayCache = new Map<string, Array<string>>();
        this.varArrayCache = new Map<string, Array<MelVariable>>();
        if (melVariable) {
            for (let tagName in melVariable) {
                if (melVariable.hasOwnProperty(tagName)) {
                    this.tagsValueMap.set(tagName, melVariable[tagName]);
                }
            }
        }
    }

    has(tagName: string): boolean {
        return this.tagsValueMap.has(tagName);
    }

    get(tagName: string): any {
        let tagValue: any = null;
        if (this.has(tagName)) {
            tagValue = this.tagsValueMap.get(tagName);
        }
        // else {
        //     console.warn('Tried to get get an unknown field "${tagName}"');
        // }
        return tagValue;
    }

    tag(tagName: string): string {
        let tagValue = '';
        if (this.has(tagName)) {
            tagValue = this.tagsValueMap.get(tagName);
            if (typeof tagValue !== 'string') {
                tagValue = '';
            }
        }
        return tagValue;
    }

    getVar(tagName: string): MelVariable {
        let tagValue = new MelVariable({});
        if (this.has(tagName)) {
            if (this.varCache.has(tagName)) {
                tagValue = this.varCache.get(tagName);
            } else {
                tagValue = new MelVariable(this.tagsValueMap.get(tagName));
                this.varCache.set(tagName, tagValue);
            }
        }
        return tagValue;
    }

    getArray(tagName: string): Array<any> {
        let tagValue: Array<any> = [];
        if (this.has(tagName)) {
            if (this.arrayCache.has(tagName)) {
                tagValue = this.arrayCache.get(tagName);
            } else {
                let array = this.tagsValueMap.get(tagName);
                let entries = Object.keys(array).sort();
                for (let entry in entries) {
                    if (array.hasOwnProperty(entry)) {
                        tagValue.push(array[entry]);
                    }
                }
                this.arrayCache.set(tagName, tagValue);
            }
        }
        // else {
        //     console.warn('Tried to get get an unknown field "${tagName}"');
        // }
        return tagValue;
    }

    getStringArray(tagName: string): Array<string> {
        let tagValue: Array<string> = [];
        if (this.has(tagName)) {
            if (this.stringArrayCache.has(tagName)) {
                tagValue = this.stringArrayCache.get(tagName);
            } else {
                let array = this.tagsValueMap.get(tagName);
                let entries = Object.keys(array).sort();
                for (let entry in entries) {
                    if (array.hasOwnProperty(entry)) {
                        tagValue.push(array[entry].toString());
                    }
                }
                this.stringArrayCache.set(tagName, tagValue);
            }
        }
        // else {
        //     console.warn('Tried to get get an unknown field "${tagName}"');
        // }
        return tagValue;
    }

    getVarArray(tagName: string): Array<MelVariable> {
        let tagValue: Array<MelVariable> = [];
        if (this.has(tagName)) {
            if (this.varArrayCache.has(tagName)) {
                tagValue = this.varArrayCache.get(tagName);
            } else {
                let array = this.tagsValueMap.get(tagName);
                let entries = Object.keys(array).sort();
                for (let entry in entries) {
                    if (entries.hasOwnProperty(entry) && array.hasOwnProperty(entries[entry])) {
                        tagValue.push(new MelVariable(array[entries[entry]]));
                    }
                }
                this.varArrayCache.set(tagName, tagValue);
            }
        }
        // else {
        //     console.warn('Tried to get get an unknown field "${tagName}"');
        // }
        return tagValue;
    }
}
