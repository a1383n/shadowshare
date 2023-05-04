import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <title>فایل باکس</title>
            <meta name="description" content="اشتراک گذاری رایگان و امن فایل ها"/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
