import React, {Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {vazirmatn} from "@/components/layout/layout";
import toast from "react-hot-toast";

interface Props {
    result?: string
    isDialogOpen: boolean;
    onDialogClosed: () => void
}

export default function UploadResultDialog(props: Props) {
    const cancelButtonRef = useRef(null);
    const [url, setUrl] = useState<string>();
    
    useEffect(() => {
        setUrl(window.location.origin + '/' + props.result);
    },[props.result])

    return (
        <Transition.Root show={props.isDialogOpen} as={Fragment}>
            <Dialog className={`relative z-10 ${vazirmatn.variable} font-sans`}
                    initialFocus={cancelButtonRef}
                    onClose={props.onDialogClosed}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"/>
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex flex-col justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="w-16 h-16 stroke-green-500">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <p className="text-center text-xl mb-4">با موفقیت آپلود شدند</p>
                                        <div className="flex w-full items-center gap-x-2">
                                            <input
                                                type="text"
                                                value={url}
                                                disabled
                                                className="w-full py-2 px-4 border border-gray-300 rounded-lg opacity-50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(url!!)
                                                        .then(() => {
                                                            toast.success("با موفقیت کپی شد")
                                                        })
                                                        .catch(reason => {
                                                            toast.error("مشکلی به وجود اومده!\n" + reason)
                                                        });
                                                }}
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                            >
                                                کپی
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-100 px-4 py-3 flex flex-row-reverse space-x-2">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        ref={cancelButtonRef}
                                        onClick={() => props.onDialogClosed()}
                                    >
                                        بستن
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}