import {Disclosure, Transition} from "@headlessui/react";
import {classNames} from "../../lib/utils/utils";
import faqData from "../../data/faq.json";

export default function Faq() {
    return (<div>
            <div className="px-6 py-12 md:px-12 text-center lg:text-start">
                <div className="container mx-auto my-5 mb-24">
                    <p className="text-3xl mb-10">سوالات متداول</p>
                    {faqData.map((value, index) => (<div key={index} className="mb-4 text-start">
                            <Disclosure>
                                {({open}) => (<>
                                        <Disclosure.Button
                                            className={classNames("flex flex-row justify-between w-full p-3 bg-gray-200 hover:bg-gray-300", open ? "rounded-t" : "rounded")}>
                                            <div
                                                className="flex flex-row justify-center items-center gap-x-3">
                                                <p className="text-base text-start md:text-xl">{value.question}</p>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                 stroke="currentColor"
                                                 className={`w-6 h-6 transition-transform duration-500 transform ${open ? 'rotate-180' : 'rotate-0'}`}>
                                                <path strokeLinecap="round"
                                                      strokeLinejoin="round"
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
                                                <div className="text-base"
                                                     dangerouslySetInnerHTML={{__html: value.answer.replace(/\n/g, "<br />")}}></div>
                                            </Disclosure.Panel>
                                        </Transition>
                                    </>)}
                            </Disclosure>
                        </div>))}
                </div>
            </div>
        </div>);
}