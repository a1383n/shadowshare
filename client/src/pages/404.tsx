import React from "react";

export default function NotFoundErrorPage() {
    return (
        <div className="px-6 py-12 md:px-12 text-center lg:text-start mb-20">
            <div className="container mx-auto max-w-lg my-5 mb-24 bg-gray-200 rounded-lg p-4">
                <div className="flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-16 h-16 stroke-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>

                    <p className="text-center text-3xl mb-4">فایل مورد نظر پیدا نشد</p>
                    <p className="text-center mb-4">404 Not found</p>
                </div>
            </div>
        </div>
    );
}