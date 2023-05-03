import Navbar from "@/components/navbar";
import {Vazirmatn} from "next/font/google";
import {ReactNode} from "react";

const vazirmatn = Vazirmatn({
    variable: '--font-vazir',
    subsets: ['arabic']
});

interface Props {
    children: ReactNode
}

export default function Layout(props: Props) {
    return (
        <div className={`${vazirmatn.variable} font-sans`}>
            <div className="flex flex-col">
                <Navbar menuItems={[
                    {name: "صفحه اصلی", isCurrent: true},
                    {name: "سوالات متداول"},
                    {name: "درباره ما"}
                ]}/>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}