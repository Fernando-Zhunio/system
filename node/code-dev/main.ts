import * as environment  from './files.json';
import * as fs from 'fs';
export class CodeDev {
    private files: string[];
    static startLine = '/** start-dev */'
    static endLine = '/** end-dev */'
    static encoding: BufferEncoding = 'utf8'
    constructor() {
        this.files = environment.files;
        console.log(this.files);
    }

    public removeCode(path: string, encoding: BufferEncoding): void {
        fs.readFile(path, {encoding}, (err, data) => {this.readFileCb(path, err, data)}  )
    }

    public removeCodeFromFiles(): void {
        this.files.forEach((file) => {
            this.removeCode(file, CodeDev.encoding)
        })
    }

    private readFileCb(path, err, data): any {
        if (err) {
            console.log(err);
            throw err;
        }

        const extension = this.getExtensionFile(path);
        console.log(extension);
        if (extension === undefined) {
            throw new Error('Extension not found for file: ' + path);
        }

        if (!this.includeExtension(extension)) {
            throw new Error('Extension not included for file: ' + path);
        }

        const regex = this.getRegexForExtension(extension);
        console.log(regex);
        const replace = data.replaceAll(regex, '')
        fs.writeFile(path, replace, this.writeFileCb);

    }

    getExtensionFile(path: string): string | undefined {
        return path.split('.').pop();
    }

    getRegexForExtension(extension: string): RegExp {
        switch (extension) {
            case 'html':
                return regexForExtensions.html        
            default:
                return regexForExtensions.default
        }
    }

    private writeFileCb(err): any {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('File is created successfully.');
    }

    includeExtension(extension: string): boolean {
        return extensions.includes(extension);
    }
}

const extensions =[ 'ts', 'html', 'scss', 'json', 'js', 'css', 'md', 'txt' ]

const regexForExtensions = {
    default: /(\/\*\* start-dev \*\/)[\s\S]*?(\/\*\* end-dev \*\/)/gm,
    'html': /(<!-- start-dev -->)[\s\S]*?(<!-- end-dev -->)/gm,
}

const codeDev = new CodeDev();
codeDev.removeCodeFromFiles();
