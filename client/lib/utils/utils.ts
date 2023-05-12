import {ErrorCode, FileError, FileRejection} from "react-dropzone";

export {};

declare global {
    interface String {
        toPersianNumber(): string;
    }

    interface File {
        hash: string;
        calculateFileHash(): Promise<string>
        equals(file: File): boolean;
    }
}

function hash(data: BufferSource) {
    return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
    });
}

if (typeof File !== "undefined") {
    File.prototype.calculateFileHash = async function (): Promise<string> {
        if (this.hash != undefined)
            return this.hash;

        this.hash = await hash(await this.arrayBuffer());
        return this.hash;
    }

    File.prototype.equals = function (file: File): boolean {
        return this.hash === file.hash;
    }
}

String.prototype.toPersianNumber = function (): string {
    const persianDigits: string = '۰۱۲۳۴۵۶۷۸۹';
    return this.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}

export function getRejectInfo(fileRejections: FileRejection[]): string {
    if (fileRejections.find(fileRejection => fileRejection.errors.find(error => error.code == ErrorCode.TooManyFiles) != undefined))
        return "تعداد فایل ها بیشتر از حد مجاز است";

    function getErrorMessage(error: FileError): string {
        console.log(error);
        switch (error.code) {
            case ErrorCode.FileInvalidType:
                return "فرمت نامعتبر.";
            case ErrorCode.FileTooLarge:
                return "حجم فایل بیشتر از حد مجاز است.";
            case ErrorCode.FileTooSmall:
                return "حجم فایل خیلی کم است.";
            default:
                return error.message;
        }
    }

    return fileRejections
        .map(fileRejection => `${fileRejection.file.name}: ${fileRejection.errors.map(error => getErrorMessage(error))}`)
        .join("\n")
}

export function formatFileName(name: string): string {
    if (name.length < 24)
        return name;

    const [fileName, type] = name.split(".", 2);
    return fileName.substring(0, 24) + "...." + type;
}

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '۰ بایت';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes: string[] = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const compressedFileTypes: string[] = [
    "application/zip",
    "application/x-tar",
    "application/x-7z-compressed",
    "application/x-bzip",
    "application/x-bzip2",
    "application/x-gzip",
    "application/x-rar-compressed",
    "application/x-zip-compressed",
    "application/octet-stream",
    "application/x-compress",
    "application/x-compressed",
    "application/x-gtar",
    "application/x-tar-gz",
    "application/x-tar-bz2",
    "application/x-tar-xz",
    "application/x-lzma",
];

export const imageMimeTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/vnd.microsoft.icon',
    'image/tiff',
    'image/x-icon',
    'image/vnd.adobe.photoshop',
];

export const textMimeTypes = [
    'text/plain',
    'text/csv',
    'text/html',
    'text/css',
    'text/javascript',
    'application/json',
    'application/xml',
    'application/javascript',
];
