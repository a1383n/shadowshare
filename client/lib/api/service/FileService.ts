import axios, {AxiosProgressEvent, AxiosResponse} from 'axios';
import {FileDto, FileDtoConverter, FileModel} from "../model/file";

export default class FileService {
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async uploadFiles(
        dto: FileDto,
        onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
    ): Promise<AxiosResponse> {
        console.log(this.apiUrl);
        try {
            return await axios.post(
                this.apiUrl + "/file",
                FileDtoConverter.toFormData(dto),
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

    async getFileInfo(id: string): Promise<FileModel> {
        try {
            return (await axios.get(`${this.apiUrl}/file/${id}/info`)).data.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async downloadFile(id: string, fileId: string, password?: string): Promise<Blob | boolean> {
        const formdata = new FormData();
        if (password && password.trim() !== '') {
            formdata.append("Password", password);
        }
        try {
            const value = await axios.post(`${this.apiUrl}/file/${id}/${fileId}`, formdata, {
                responseType: "blob",
            });
            if (value.status === 200) {
                return new Blob([value.data]);
            } else {
                return false;
            }
        } catch (error: any) {
            throw new Error(error);
        }

    }
}