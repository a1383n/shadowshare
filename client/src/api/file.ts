import axios, {AxiosProgressEvent, AxiosResponse} from "axios";
import FormData from "form-data";

export interface FileModel {
    files: File[];
    expireAt: string;
    expireWith: number;
    password?: string;
    description?: string;
}

//
// export class FileRepository {
//     private readonly externalServiceUrl: string;
//
//     constructor(externalServiceUrl: string) {
//         this.externalServiceUrl = externalServiceUrl;
//     }
//
//     private getUrl(route: string) {
//         return new URL(route,this.externalServiceUrl).toString();
//     }
// }

export async function uploadFiles(
    model: FileModel,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<AxiosResponse> {
    const formData = new FormData();
    model.files.forEach(value => formData.append("Files", value));
    formData.append("DeleteAfter", model.expireAt);
    formData.append("DeleteWithDownloadCount", model.expireWith);
    model.password != undefined && formData.append("Password", model.password);
    model.description != undefined && formData.append("Description", model.description);

    try {
        return await axios.post(
            "/api/file",
            formData,
            {
                onUploadProgress, headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    } catch (error: any) {
        throw new Error(error);
    }
}
