import React from 'react'
import {Disclosure, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from "next/image";
import {MenuItem} from "@/components/layout/layout";
import Link from "next/link";

interface NavbarProps {
    menuItems: MenuItem[]
}

export default function Navbar(props: NavbarProps) {
    return (<Disclosure as="nav" className="bg-slate-50 shadow-lg">
        {({open}) => (<>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button
                            className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none">
                            <span className="sr-only">بازکردن منوی اصلی</span>
                            {open ? (<XMarkIcon className="block h-6 w-6" aria-hidden="true"/>) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>)}
                        </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center me-6">
                            <Image
                                width={150}
                                height={150}
                                className="h-8 w-auto sm:hidden"
                                src="/logo.png"
                                alt="فایل باکس"
                            />
                            <Image
                                width={500}
                                height={150}
                                className="hidden h-8 w-auto sm:block"
                                src="/logo_full.png"
                                alt="فایل باکس"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex gap-x-4">
                                {
                                    props.menuItems.map((value, index) => (
                                        <div
                                            key={index}
                                            className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                            <Link {...value.props}>{value.title}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition
                show={open}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {props.menuItems.map((item, index) => (
                            <Disclosure.Button
                                key={index}
                                className="text-black w-full text-start hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >
                                <Link {...item.props}>{item.title}</Link>
                            </Disclosure.Button>))}
                    </div>
                </Disclosure.Panel>
            </Transition>
        </>)}
    </Disclosure>);
}