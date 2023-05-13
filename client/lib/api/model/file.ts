export interface FileDto {
    Files: File[];
    Password?: string;
    DeleteAfter: string;
    DeleteWithDownloadCount: number;
    Description?: string;
}

export interface FileDto {
    Files: File[];
    Password?: string;
    DeleteAfter: string;
    DeleteWithDownloadCount: number;
    Description?: string;
}

export class FileDtoConverter {
    static toFormData(fileDto: FileDto): FormData {
        const formData = new FormData();
        formData.append('DeleteAfter', fileDto.DeleteAfter);
        formData.append('DeleteWithDownloadCount', fileDto.DeleteWithDownloadCount.toString());

        if (fileDto.Password) {
            formData.append('Password', fileDto.Password);
        }

        if (fileDto.Description) {
            formData.append('Description', fileDto.Description);
        }

        fileDto.Files.forEach((file) => {
            formData.append('Files', file);
        });

        return formData;
    }
}


export interface FileModel {
    id: string;
    files: {
        id: string,
        name: string,
        contentType: string,
        size: number,
        hash: string
    }[];
    expireAt: string;
    remainingDownloadCount: number;
    isEncrypted: boolean;
    description?: string
}