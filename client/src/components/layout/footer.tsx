import Image from "next/image";
import logo from "../../../public/logo_full.png"
import Link from "next/link";
import {MenuItem} from "@/components/layout/layout";

interface Props {
    menuList: MenuItem[]
}

export default function Footer(props: Props) {
    return (
        <div className="w-full bg-gray-300">
            <div className="container m-auto my-5">
                <div className="flex flex-col items-center gap-y-2 justify-between">
                    <div className="flex flex-col justify-center items-center">
                        <Image src={logo} height={50} alt="Logo" className="mb-3"/>
                        <div className="flex flex-row items-center gap-x-4">
                            {
                                props.menuList.map((value, index) => (
                                    <div
                                        key={index}
                                        className="text-black text-sm p-2 rounded transition hover:bg-black hover:text-white">
                                        <Link {...value.props}>{value.title}</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-x-4">
                        <Link href="https://github.com/a1383n/shadowshare" target="_blank" className="group transition rounded-full p-2 hover:bg-black">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 transition group-hover:fill-white">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
                            </svg>
                        </Link>
                    </div>
                    <div className="text-center text-black">
                        <p>حق کپی رایت ۲۰۲۳</p>
                        <p>این پروژه تحت شرایط مجوز MIT منتشر شده است.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}