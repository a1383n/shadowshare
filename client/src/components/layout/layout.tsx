import {Vazirmatn} from "next/font/google";
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";
import {LinkProps} from "next/link";
import {Footer, Navbar} from "@/components/layout";

export const vazirmatn = Vazirmatn({
    variable: '--font-vazir',
    subsets: ['arabic']
});

export interface MenuItem {
    title: string;
    props: LinkProps;
}

interface Props {
    children: ReactNode
}

const menuItems: MenuItem[] = [
    {title: "صفحه اصلی", props: {href: "/"}},
    {title: "سوالات متداول", props: {href: "/faq"}},
    {title: "درباره ما", props: {href: "/about"}},
];

export default function Layout(props: Props) {
    return (
        <div className={`${vazirmatn.variable} font-sans`}>
            <div className="flex flex-col">
                <Navbar menuItems={menuItems}/>
                <div>
                    <div><Toaster/></div>
                    {props.children}
                </div>
                <Footer menuList={menuItems} />
            </div>
        </div>
    );
}