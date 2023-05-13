import {FileModel} from "../../lib/api/model/file";
import {GetServerSideProps} from "next";
import FileService from "../../lib/api/service/FileService";
import React, {useEffect, useState} from "react";
import {formatBytes, formatFileName} from "../../lib/utils/utils";
import {getFileTypeIcon} from "@/components/upload_dialog";
import PasswordDialog from "@/components/password_dialog";
import toast from "react-hot-toast";

interface Props {
    model: FileModel
}

export default function DownloadPage(props: Props) {
    const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [password, setPassword] = useState<string>();

    const service = new FileService("/api");

    useEffect(() => {
        if (props.model.isEncrypted) {
            setPasswordDialogOpen(true);
        }
    }, [props.model])

    return (
        <>
            <PasswordDialog isDialogOpen={isPasswordDialogOpen} onDialogClosed={password => {
                setPassword(password);
                setPasswordDialogOpen(false);
            }}/>
            <div className="px-6 py-12 md:px-12 text-center lg:text-start">
                <div className="container mx-auto max-w-4xl my-5 mb-24 bg-gray-200 rounded-lg p-4">
                    <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-16 h-16 stroke-primary">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"/>
                        </svg>
                        <p className="text-center text-lg mb-4">فایل ها آماده دانلود می باشند</p>
                        <div
                            className="grid grid-cols-1 gap-y-2 mt-4 w-full max-w-lg ring ring-primary p-4 rounded">
                            {
                                props.model.files
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row w-full p-3 rounded justify-between items-center bg-white">
                                            <div
                                                className="flex items-center gap-x-3">
                                                {getFileTypeIcon(item.contentType)}
                                                <span
                                                    className="font-mono"
                                                    title={item.name}>{formatFileName(item.name)}</span>
                                            </div>
                                            <span>{formatBytes(item.size).toPersianNumber()}</span>
                                            <div
                                                className="group p-2 rounded-full hover:cursor-pointer hover:bg-primary"
                                                onClick={() => {
                                                    const promise = service.downloadFile(props.model.id, item.id, password);
                                                    toast.promise(promise,{
                                                        success: "فایل با موفقیت دانلود شد.",
                                                        error: "کلمه عبور اشتباه است",
                                                        loading: "در حال دانلود..."
                                                    })
                                                        .then(value => {
                                                            if (value !== false) {
                                                                const url = window.URL.createObjectURL(value as Blob);
                                                                const link = document.createElement('a');
                                                                link.href = url;
                                                                link.setAttribute('download', item.name);
                                                                document.body.appendChild(link);
                                                                link.click();
                                                                document.body.removeChild(link);
                                                            }
                                                        })
                                                        .catch(reason => {
                                                            setPasswordDialogOpen(true);
                                                            console.log(reason);
                                                        })

                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"
                                                     className="w-6 h-6 group-hover:stroke-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                                                </svg>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    {
                        props.model.description !== undefined ? (<div className="text-start mt-6">
                            <span>توضیحات: </span>
                            <p>{props.model.description}</p>
                        </div>) : <></>
                    }
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const service = new FileService(process.env.EXTERNAL_SERVICE_URL! + "/api");

    try {
        const model = await service.getFileInfo(context.query.id!!.toString());
        console.log(model);
        return {
            props: {
                model: model
            }
        }
    } catch (error: any) {
        console.error(error)
        return {
            notFound: true
        }
    }
}
