import {ErrorCode, FileError, FileRejection} from "react-dropzone";

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