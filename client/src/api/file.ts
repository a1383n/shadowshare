import axios, {AxiosProgressEvent, AxiosResponse} from "axios";

// export interface FileModel {
//     files: File[];
//     expireAt: string;
//     expireWith: number;
//     password?: string;
//     description?: string;
// }
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
    data: any,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<AxiosResponse> {
    try {
        return await axios.post(
            "/api/file",
            data,
            {onUploadProgress}
        );
    } catch (error: any) {
        throw new Error(error);
    }
}
