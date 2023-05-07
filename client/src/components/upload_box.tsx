import {classNames} from "@/utils/utils";
import {DropzoneState} from "react-dropzone";

interface Props {
    dropZoneState: DropzoneState
}

export default function UploadBox(props: Props) {
    return (
        <div {...props.dropZoneState.getRootProps({className: classNames("h-96 flex flex-col justify-center outline outline-8 outline-primary border-dashed border-4 border-blue-700", props.dropZoneState.isDragActive ? "bg-indigo-400" : "")})}>
            <div className="flex-shrink">
                <input {...props.dropZoneState.getInputProps()}/>
                <div
                    className={props.dropZoneState.isDragActive ? "hidden" : "flex flex-col items-center justify-between gap-y-3"}>
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
                        onClick={props.dropZoneState.open}>
                        فایل را انتخاب کنید
                    </button>
                    <button
                        className="lg:hidden hover:bg-primary hover:text-white transition outline outline-primary px-10 py-2 rounded-sm text-primary"
                        onClick={props.dropZoneState.open}>
                        انتخاب فایل
                    </button>
                </div>
                <div
                    className={props.dropZoneState.isDragActive ? "flex flex-col items-center justify-between gap-y-6" : "hidden"}>
                    <span className="text-white text-xl">رها کنید!</span>
                </div>
            </div>
        </div>
    );
}