import toast from "react-hot-toast";
import {classNames, getRejectInfo} from "@/utils/utils";
import UploadDialog from "@/components/upload_dialog";
import {useDropzone} from "react-dropzone";
import {useState} from "react";

export default function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [files,setFiles] = useState<File[]>([]);

    const dropZoneState = useDropzone({
        onDropRejected: fileRejections => {
            toast.error(getRejectInfo(fileRejections));
        },
        onDropAccepted: acceptedFiles => {
            // Check overall file size is not gather than 10m
            if (acceptedFiles.map(value => value.size).reduce((previousValue, currentValue) => previousValue + currentValue) > 10 * 1024 * 1024) {
                toast.error("حجم کل فایل ها بیشتر از حد مجاز است.");
            }

            setFiles(prevState => prevState.concat(acceptedFiles));
            setIsDialogOpen(true);

            console.log("States are set",acceptedFiles,files,isDialogOpen);
        },
        maxFiles: 3,
        maxSize: 10 * 1024 * 1024,
        minSize: 1,
        noClick: true,
        noKeyboard: true
    });

    return (
        <>
            <UploadDialog
                selectedFiles={files}
                isDialogOpen={isDialogOpen}
                onDialogClosed={() => {
                    setFiles([]);
                    setIsDialogOpen(false)
                }}
                onFileSelected={files1 => {
                    const total = files.concat(files1);
                    if (total.length > 3) {
                        toast.error("تعداد فایل ها بیشتر از حد مجاز است")
                    } else if (total.map(value => value.size).reduce((previousValue, currentValue) => previousValue + currentValue) > 10 * 1024 * 1024) {
                        toast.error("حجم کل فایل ها بیشتر از حد مجاز است.");
                    }else {
                        if (files1.length > 0) {
                            toast.success(`${files1.length.toString().toPersianNumber()} فایل افزوده شد `)
                        }
                        setFiles(total);
                    }
                }}
            />
            <div className="px-6 py-12 md:px-12 text-center lg:text-start">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="mt-12 lg:mt-0 xl:ps-10">
                            <div className="text-4xl xl:text-5xl font-bold tracking-tight mb-6">
                                <span className="text-primary">فایل های خود را <span
                                    className="text-secondary">آپلود</span> کنید.</span>
                            </div>
                            <div className="text-2  xl">
                                <span>راهی آسان و رایگان برای آپلود داده های شما</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4 text-sm md:text-base">
                                <div className="flex flex-row gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                    </svg>
                                    <span>آپلود فایل با هر فرمتی</span>
                                </div>
                                <div className="flex flex-row gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                    </svg>
                                    <span>اشتراک گذاری ایمن</span>
                                </div>
                                <div className="flex flex-row gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span>مدیریت فایل به هنگام آپلود</span>
                                </div>
                                <div className="flex flex-row gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                    </svg>
                                    <span>اشتراک گذاری به صورت ناشناس</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12 lg:mb-0 p-10 lg:p-16"
                             style={{backgroundImage: `url('pattern.png')`, backgroundSize: "cover"}}>
                            <div {...dropZoneState.getRootProps({className: classNames("h-96 flex flex-col justify-center outline outline-8 outline-primary border-dashed border-4 border-blue-700", dropZoneState.isDragActive ? "bg-indigo-400" : "")})}>
                                <div className="flex-shrink">
                                    <input {...dropZoneState.getInputProps()}/>
                                    <div
                                        className={dropZoneState.isDragActive ? "hidden" : "flex flex-col items-center justify-between gap-y-3"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5}
                                             stroke="currentColor" className="w-16 h-16 stroke-primary fill-transparent mb-2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
                                        </svg>
                                        <span className="lg:hidden text-xl">فایل را برای آپلود انتخاب کنید</span>
                                        <span className="hidden lg:block text-xl">فایل را برای آپلود بکشید</span>
                                        <span className="hidden lg:block text-gray-500">یا اینکه</span>
                                        <button
                                            className="hidden hover:bg-primary hover:text-white transition lg:block outline outline-primary px-10 py-2 rounded-sm text-primary"
                                            onClick={dropZoneState.open}>
                                            فایل را انتخاب کنید
                                        </button>
                                        <button
                                            className="lg:hidden hover:bg-primary hover:text-white transition outline outline-primary px-10 py-2 rounded-sm text-primary"
                                            onClick={dropZoneState.open}>
                                            انتخاب فایل
                                        </button>
                                    </div>
                                    <div
                                        className={dropZoneState.isDragActive ? "flex flex-col items-center justify-between gap-y-6" : "hidden"}>
                                        <span className="text-white text-xl">رها کنید!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
