import {Dialog, Disclosure, Transition} from "@headlessui/react";
import React, {Fragment, useRef} from "react";
import {vazirmatn} from "@/components/layout";
import {
    classNames,
    compressedFileTypes,
    formatBytes,
    formatFileName,
    getRejectInfo,
    imageMimeTypes,
    textMimeTypes
} from "@/utils/utils";
import {useDropzone} from "react-dropzone";
import zipIcon from "../../public/icon/file_zip.svg"
import imageIcon from "../../public/icon/file_image.svg"
import textIcon from "../../public/icon/file_text.svg"
import unknownIcon from "../../public/icon/file_unknown.svg"
import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
    isDialogOpen: boolean;
    selectedFiles: File[];
    onDialogClosed: () => void;
    onFileSelected: (files: File[]) => void;
}

function getFileTypeIcon(file: File): JSX.Element {
    if (compressedFileTypes.includes(file.type)) {
        return <Image src={zipIcon} alt={"Compressed File"}/>
    } else if (imageMimeTypes.includes(file.type)) {
        return <Image src={imageIcon} alt={"Image File"}/>
    } else if (textMimeTypes.includes(file.type)) {
        return <Image src={textIcon} alt={"Text File"}/>
    } else {
        return <Image src={unknownIcon} alt={"Unknown File"}/>
    }
}


export default function UploadDialog(props: Props) {
    const cancelButtonRef = useRef(null);

    const dropZoneState = useDropzone({
        onDropRejected: fileRejections => {
            toast.error(getRejectInfo(fileRejections));
        },
        onDropAccepted: acceptedFiles => {
            // Check overall file size is not gather than 10m
            if (acceptedFiles.map(value => value.size).reduce((previousValue, currentValue) => previousValue + currentValue) > 10 * 1024 * 1024) {
                toast.error("حجم کل فایل ها بیشتر از حد مجاز است.");
            }

            const arr: File[] = [];
            acceptedFiles.forEach(file => {
               if (props.selectedFiles.some(value => value.name === file.name && value.size === file.size)) {
                   toast(`${formatFileName(file.name)}: \n` + "این فایل قبلا انتخاب شده است!", {
                       icon: '⚠️',
                   })
               }else {
                   arr.push(file);
               }
            });

            props.onFileSelected(arr);
            },
        maxFiles: 3,
        maxSize: 10 * 1024 * 1024,
        minSize: 1,
    });

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
                                className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex flex-col gap-y-3 md:flex-row">
                                        <div className="flex max-w-lg flex-col w-full flex-grow me-2">
                                            <Disclosure defaultOpen={true}>
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className={classNames("flex flex-row justify-between w-full p-3 bg-gray-200", open ? "rounded-t" : "rounded")}>
                                                            <div
                                                                className="flex flex-row justify-center items-center gap-x-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                                                </svg>
                                                                <span>فایل ها</span>
                                                            </div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor"
                                                                 className={`w-6 h-6 transition-transform duration-500 transform ${open ? 'rotate-180' : 'rotate-0'}`}>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                            </svg>
                                                        </Disclosure.Button>
                                                        <Transition
                                                            enter="transition-all duration-500 ease-in-out"
                                                            enterFrom="opacity-0 max-h-0"
                                                            enterTo="opacity-100 max-h-full"
                                                            leave="transition-all duration-500 ease-in-out"
                                                            leaveFrom="opacity-100 max-h-full"
                                                            leaveTo="opacity-0 max-h-0"
                                                        >
                                                            <Disclosure.Panel
                                                                className={classNames("px-4 pt-4 pb-2 text-sm bg-gray-200", open ? "rounded-b" : "")}
                                                            >
                                                                <div
                                                                    className="outline outline-primary p-2 mb-4 rounded">
                                                                    <input {...dropZoneState.getInputProps()}/>
                                                                    <div {...dropZoneState.getRootProps({className: "bg-white rounded flex items-center justify-center h-32"})}>
                                                                        <span className="text-xl">فایل ها به اینجا بکشید یا <span
                                                                            className="text-primary">اضافه</span> کنید.</span>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 gap-y-2 mt-4">
                                                                        {
                                                                            props.selectedFiles
                                                                                .map(item => (
                                                                                    <div
                                                                                        key={item.hash}
                                                                                        className="flex flex-row w-full p-3 rounded justify-between items-center bg-white">
                                                                                        <div
                                                                                            className="flex items-center gap-x-3">
                                                                                            {getFileTypeIcon(item)}
                                                                                            <span
                                                                                                className="font-mono"
                                                                                                title={item.name}>{formatFileName(item.name)}</span>
                                                                                        </div>
                                                                                        <span>{formatBytes(item.size).toPersianNumber()}</span>
                                                                                    </div>
                                                                                ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <Disclosure>
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className={classNames("flex flex-row justify-between w-full p-3 bg-gray-200", open ? "rounded-t" : "rounded")}>
                                                            <div
                                                                className="flex flex-row justify-center items-center gap-x-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                                </svg>
                                                                <span>تنظیمات</span>
                                                            </div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor"
                                                                 className={`w-6 h-6 transition-transform duration-500 transform ${open ? 'rotate-180' : 'rotate-0'}`}>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                            </svg>
                                                        </Disclosure.Button>
                                                        <Transition
                                                            enter="transition-all duration-500 ease-in-out"
                                                            enterFrom="opacity-0 max-h-0"
                                                            enterTo="opacity-100 max-h-full"
                                                            leave="transition-all duration-500 ease-in-out"
                                                            leaveFrom="opacity-100 max-h-full"
                                                            leaveTo="opacity-0 max-h-0"
                                                        >
                                                            <Disclosure.Panel
                                                                className={classNames("px-4 pt-4 pb-2 text-sm bg-gray-200", open ? "rounded-b" : "")}
                                                            >
                                                                <div className="flex flex-row gap-x-4">
                                                                    <div>
                                                                        <label htmlFor="duration"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            زمان انقضا
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <input
                                                                                id="duration"
                                                                                type="number"
                                                                                maxLength={2}
                                                                                minLength={1}
                                                                                defaultValue={15}
                                                                                className="block w-32 rounded-md text-left border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            />
                                                                            <div
                                                                                className="absolute inset-y-0 right-0 flex items-center">
                                                                                <select
                                                                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                                                >
                                                                                    <option>دقیقه</option>
                                                                                    <option>ساعت</option>
                                                                                    <option>روز</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="">
                                                                        <label htmlFor="max_download"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            حداکثر تعداد دانلود
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <input
                                                                                id="max_download"
                                                                                type="number"
                                                                                max={1000}
                                                                                min={1}
                                                                                minLength={1}
                                                                                maxLength={4}
                                                                                defaultValue={10}
                                                                                className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm mt-3">فایل ها بعد از رسیدن به یکی از محدودیت های بالا حذف خواهند شد</p>
                                                            </Disclosure.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Disclosure>
                                            <span className="h-1 my-1"></span>
                                            <Disclosure>
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className={classNames("flex flex-row justify-between w-full p-3 bg-gray-200", open ? "rounded-t" : "rounded")}>
                                                            <div
                                                                className="flex flex-row justify-center items-center gap-x-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                                                </svg>
                                                                <span>محافظت</span>
                                                            </div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor"
                                                                 className={`w-6 h-6 transition-transform duration-500 transform ${open ? 'rotate-180' : 'rotate-0'}`}>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                            </svg>
                                                        </Disclosure.Button>
                                                        <Transition
                                                            enter="transition-all duration-500 ease-in-out"
                                                            enterFrom="opacity-0 max-h-0"
                                                            enterTo="opacity-100 max-h-full"
                                                            leave="transition-all duration-500 ease-in-out"
                                                            leaveFrom="opacity-100 max-h-full"
                                                            leaveTo="opacity-0 max-h-0"
                                                        >
                                                            <Disclosure.Panel
                                                                className={classNames("px-4 pt-4 pb-2 text-sm bg-gray-200", open ? "rounded-b" : "")}
                                                            >
                                                                <div className="flex flex-row gap-x-4">
                                                                    <div className="w-full">
                                                                        <label htmlFor="password"
                                                                               className="block text-sm font-medium leading-6 text-gray-900">
                                                                            کلمه عبور
                                                                        </label>
                                                                        <div
                                                                            className="relative mt-2 rounded-md shadow-sm">
                                                                            <input
                                                                                id="password"
                                                                                type="password"
                                                                                minLength={4}
                                                                                maxLength={32}
                                                                                placeholder={"حداقل 4 و حداکثر 32 کاراکتر (اختیاری)".toPersianNumber()}
                                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                            />
                                                                            <p className="text-sm mt-3">فایل ها با این کلمه عبور رمزنگاری خواهند شد.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Disclosure>
                                            <span className="h-1 my-1"></span>
                                            <Disclosure>
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className={classNames("flex flex-row justify-between w-full p-3 bg-gray-200", open ? "rounded-t" : "rounded")}>
                                                            <div
                                                                className="flex flex-row justify-center items-center gap-x-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                                                                </svg>
                                                                <span>توضیحات</span>
                                                            </div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor"
                                                                 className={`w-6 h-6 transition-transform duration-500 transform ${open ? 'rotate-180' : 'rotate-0'}`}>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                            </svg>
                                                        </Disclosure.Button>
                                                        <Transition
                                                            enter="transition-all duration-500 ease-in-out"
                                                            enterFrom="opacity-0 max-h-0"
                                                            enterTo="opacity-100 max-h-full"
                                                            leave="transition-all duration-500 ease-in-out"
                                                            leaveFrom="opacity-100 max-h-full"
                                                            leaveTo="opacity-0 max-h-0"
                                                        >
                                                            <Disclosure.Panel
                                                                className={classNames("px-4 pt-4 pb-2 text-sm bg-gray-200", open ? "rounded-b" : "")}
                                                            >
                                                                <textarea
                                                                    className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                                                    rows={4}
                                                                    maxLength={256}
                                                                    placeholder={"حداکثر 256 کاراکتر (اختیاری)".toPersianNumber()}>
                                                                </textarea>
                                                                <p className="text-sm mt-3">این توضیحات در زمان دانلود
                                                                    فایل نمایش داده خواهد شد</p>
                                                            </Disclosure.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-100 px-4 py-3 flex flex-row-reverse space-x-2">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:mt-0 sm:w-auto"
                                        onClick={() => {}}
                                    >
                                        آپلود
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => props.onDialogClosed()}
                                        ref={cancelButtonRef}
                                    >
                                        لغو
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