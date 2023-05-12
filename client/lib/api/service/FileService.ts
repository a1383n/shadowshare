import axios, {AxiosProgressEvent, AxiosResponse} from 'axios';
import {FileDto, FileDtoConverter} from "../model/file";

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
}