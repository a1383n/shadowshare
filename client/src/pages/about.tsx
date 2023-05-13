export default function About() {
    return (<div>
            <div className="px-6 py-12 md:px-12 text-center lg:text-start">
                <div className="container mx-auto my-5 mb-24">
                    <p className="text-3xl mb-10">درباره</p>
                    <p className="text-base">
                        فایل باکس یک برنامه وب است که به کاربران اجازه می‌دهد فایل‌ها را با دیگران به صورت امن و ناشناس
                        به اشتراک بگذارند. بخش سرور با ASP.NET Core 6 ساخته شده است، در حالی که بخش کلاینت با استفاده از
                        Next.js پیاده‌سازی شده است. این برنامه همچنین از Docker پشتیبانی می‌کند تا استقرار آن به سادگی
                        امکان‌پذیر باشد.
                    </p>
                </div>
            </div>
        </div>);
}