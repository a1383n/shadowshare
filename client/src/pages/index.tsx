import toast from "react-hot-toast";
import {classNames, getRejectInfo} from "../../lib/utils/utils";
import UploadDialog from "@/components/upload_dialog";
import {useDropzone} from "react-dropzone";
import {useRef, useState} from "react";
import UploadResultDialog from "@/components/upload_result_dialog";

export default function Home() {
    const introRef = useRef<HTMLDivElement>(null);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [isUploadResultDialogOpen, setIsUploadResultDialogOpen] = useState(false);
    const [uploadResult, setUploadResult] = useState<string>();
    const [files, setFiles] = useState<File[]>([]);

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
            setIsUploadDialogOpen(true);

            console.log("States are set", acceptedFiles, files, isUploadDialogOpen);
        },
        maxFiles: 3,
        maxSize: 10 * 1024 * 1024,
        minSize: 1,
        noClick: true,
        noKeyboard: true
    });

    return (
        <>
            <UploadResultDialog
                result={uploadResult}
                isDialogOpen={isUploadResultDialogOpen}
                onDialogClosed={() => {
                    setIsUploadResultDialogOpen(false)
                }}/>
            <UploadDialog
                selectedFiles={files}
                isDialogOpen={isUploadDialogOpen}
                onUploadComplete={id => {
                    setFiles([]);
                    setIsUploadDialogOpen(false);
                    setUploadResult(id);
                    setIsUploadResultDialogOpen(true)
                }}
                onDialogClosed={() => {
                    setFiles([]);
                    setIsUploadDialogOpen(false)
                }}
                onFileSelected={files1 => {
                    const total = files.concat(files1);
                    if (total.length > 3) {
                        toast.error("تعداد فایل ها بیشتر از حد مجاز است")
                    } else if (total.map(value => value.size).reduce((previousValue, currentValue) => previousValue + currentValue) > 10 * 1024 * 1024) {
                        toast.error("حجم کل فایل ها بیشتر از حد مجاز است.");
                    } else {
                        if (files1.length > 0) {
                            toast.success(`${files1.length.toString().toPersianNumber()} فایل افزوده شد `)
                        }
                        setFiles(total);
                    }
                }}
            />
            <div className="px-6 pt-12 md:px-12 text-center lg:text-start">
                <div className="container mx-auto my-5 mb-16">
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor"
                                             className="w-16 h-16 stroke-primary fill-transparent mb-2">
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
            <div className="h-20 w-full mx-auto relative">
                <div
                    className="w-full border border-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-3"></div>
                <div
                    onClick={() => {
                        introRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-2xl shadow-black p-4 animate-bounce transition group hover:bg-slate-800 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:stroke-white transition">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                </div>
            </div>
            <div className="container mx-auto px-6 pt-12 md:px-12" ref={introRef}>
                <div className="px-12 text-center mb-16">
                    <p className="text-2xl font-bold mb-3">آپلود فایل ها به صورت رایگان، بدون ثبت نام</p>
                    <p className="text-lg text-gray-400">آپلود فایل ها، اشتراک گذاری و ذخیره سازی فایل را آسان و ساده می کند. <br/>فضای ذخیره سازی ابری رمزگذاری شده ما از جدیدترین تکنیک های امنیتی استفاده میکند <br/>تا داده های شما را همیشه ایمن و محافظت کند.</p>
                </div>
                <div className="grid grid-cols-1">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-start">
                            <p className="text-2xl font-bold mb-3">هر نوع فایل را آپلود کنید!</p>
                            <p className="text-lg text-gray-400">هیچ محدودیتی در مورد نوع فایلی که می توانید در فایل باکس <br/>به طور رایگان آپلود کنید وجود ندارد. <br/>تنهای محدودیت که وجود دارد، محدودیت حجم فایل ها است.</p>
                        </div>
                        <div>
                            <svg width="250" height="250" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_0_1)">
                                    <rect x="100" y="100" width="160" height="160" rx="20" fill="#EC605F"/>
                                </g>
                                <path d="M224.637 183.273C226.678 183.273 228.333 181.617 228.333 179.575V174.644C228.333 155.089 219.623 145.567 201.777 145.567H188.604C186.46 145.577 184.434 144.587 183.123 142.889L178.874 137.235C176.129 133.712 171.909 131.656 167.444 131.667H158.181C140.59 131.667 131.667 141.826 131.667 161.891V198.152C131.667 216.771 143.224 228.333 161.878 228.333H198.08C216.691 228.333 228.291 216.771 228.291 198.152C228.087 196.251 226.484 194.809 224.573 194.809C222.662 194.809 221.058 196.251 220.855 198.152C220.855 212.817 212.782 220.937 198.08 220.937H161.835C147.133 220.937 139.06 212.86 139.06 198.152V194.623H198.547C200.589 194.623 202.244 192.967 202.244 190.925C202.244 188.882 200.589 187.227 198.547 187.227H139.06V161.721C139.06 145.737 144.754 138.893 158.138 138.893H167.486C169.631 138.925 171.646 139.925 172.968 141.614L177.217 147.225C179.914 150.801 184.127 152.908 188.604 152.921H201.734C215.543 152.921 220.897 159.085 220.897 174.644V179.575C220.897 180.563 221.293 181.51 221.995 182.205C222.698 182.9 223.649 183.285 224.637 183.273Z" fill="#F7F7F7"/>
                                <defs>
                                    <filter id="filter0_d_0_1" x="0" y="0" width="360" height="360" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="50"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.92549 0 0 0 0 0.376471 0 0 0 0 0.372549 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse justify-between items-center">
                        <div className="text-start">
                            <p className="text-2xl font-bold mb-3">بدون پاپ آپ، بدون بد افزار!</p>
                            <p className="text-lg text-gray-400">بدون تبلیغات پاپ آپ، بدون بدافزار هایی که میتوانند <br/>سیستم شما را به بدافزار آلوده کنند. ما به شما این اطمینان را میدهیم <br/>که میتوانید بدون توجه به مدت زمانی که در فایل باکس <br/>صرف میکنید، ایمن بمانید.</p>
                        </div>
                        <div>
                            <svg width="250" height="250" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_0_1)">
                                    <rect x="100" y="100" width="160" height="160" rx="20" fill="#606CEC"/>
                                </g>
                                <path fillRule="evenodd" clipRule="evenodd" d="M180.55 138.062H180.465C170.105 138.062 161.667 146.321 161.617 156.51V163.057H199.378V156.592C199.378 146.374 190.93 138.062 180.55 138.062ZM206.81 156.592V164.378C215.585 167.405 221.938 175.542 221.938 185.199V206.108C221.938 218.32 211.839 228.25 199.428 228.25H199.284H182.655C180.604 228.25 178.939 226.612 178.939 224.594C178.939 222.576 180.604 220.938 182.655 220.938H199.284C207.598 220.938 214.356 214.288 214.356 206.108C214.356 205.929 214.403 205.768 214.45 205.607C214.469 205.538 214.489 205.47 214.505 205.401V185.199C214.505 177.019 207.742 170.369 199.428 170.369H161.572C153.258 170.369 146.495 177.019 146.495 185.199V205.401C146.511 205.475 146.531 205.549 146.551 205.622C146.595 205.779 146.638 205.935 146.638 206.108C146.638 214.288 153.402 220.938 161.716 220.938C163.767 220.938 165.432 222.576 165.432 224.594C165.432 226.612 163.767 228.25 161.716 228.25C161.699 228.25 161.683 228.248 161.667 228.245C161.65 228.243 161.634 228.24 161.617 228.24L161.595 228.245L161.572 228.25C149.161 228.25 139.062 218.32 139.062 206.108V185.199C139.062 175.542 145.41 167.405 154.185 164.378V156.592C154.249 142.27 166.022 130.75 180.45 130.75H180.564C195.028 130.75 206.81 142.343 206.81 156.592ZM184.215 190.239V201.066C184.215 203.084 182.55 204.722 180.499 204.722C178.448 204.722 176.783 203.084 176.783 201.066V190.239C176.783 188.22 178.448 186.582 180.499 186.582C182.55 186.582 184.215 188.22 184.215 190.239Z" fill="#F7F7F7"/>
                                <defs>
                                    <filter id="filter0_d_0_1" x="0" y="0" width="360" height="360" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="50"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.376471 0 0 0 0 0.423529 0 0 0 0 0.92549 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-start">
                            <p className="text-2xl font-bold mb-3">بدون نیاز به ثبت نام!</p>
                            <p className="text-lg text-gray-400">در فایل باکس برای استفاده از امکانات سایت <br/>و آپلود فایل نیازی به ثبت نام ندارید.</p>
                        </div>
                        <div>
                            <svg width="250" height="250" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_0_1)">
                                    <rect x="100" y="100" width="160" height="160" rx="20" fill="#32A2E1"/>
                                </g>
                                <path fillRule="evenodd" clipRule="evenodd" d="M179.134 131.667H203.623C215.913 131.667 225.917 141.285 225.917 153.112V189.913C225.917 191.967 224.178 193.63 222.048 193.63C219.907 193.63 218.174 191.967 218.174 189.913V153.112C218.174 145.393 211.647 139.11 203.623 139.11H179.134C171.08 139.11 164.528 145.413 164.528 153.16V157.66C164.528 159.714 162.799 161.377 160.659 161.377C158.523 161.377 156.79 159.714 156.79 157.66V153.16C156.79 141.309 166.814 131.667 179.134 131.667ZM187.69 172.072C186.969 172.812 186.017 173.179 185.06 173.179C184.121 173.179 183.179 172.822 182.452 172.101L178.913 168.588C177.46 167.143 177.446 164.789 178.884 163.324C180.317 161.86 182.659 161.85 184.121 163.295L187.666 166.814C189.119 168.254 189.133 170.613 187.69 172.072ZM178.895 196.686C177.451 195.226 177.456 192.872 178.904 191.422L186.599 183.723H137.787C135.743 183.723 134.083 182.055 134.083 180.001C134.083 177.947 135.743 176.275 137.787 176.275H195.569C197.07 176.275 198.421 177.183 198.994 178.58C199.566 179.972 199.244 181.577 198.186 182.64L184.132 196.695C183.411 197.416 182.463 197.778 181.516 197.778C180.568 197.778 179.616 197.416 178.895 196.686ZM222.045 203.118C219.91 203.118 218.177 204.785 218.177 206.84C218.177 214.587 211.625 220.89 203.57 220.89H179.081C171.062 220.89 164.53 214.607 164.53 206.888V202.34C164.53 200.286 162.797 198.619 160.661 198.619C158.526 198.619 156.793 200.286 156.793 202.34V206.888C156.793 218.715 166.791 228.333 179.081 228.333H203.57C215.89 228.333 225.914 218.691 225.914 206.84C225.914 204.785 224.181 203.118 222.045 203.118Z" fill="#F7F7F7"/>
                                <defs>
                                    <filter id="filter0_d_0_1" x="0" y="0" width="360" height="360" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="50"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.196078 0 0 0 0 0.635294 0 0 0 0 0.882353 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
