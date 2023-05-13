import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useRef} from "react";
import {vazirmatn} from "@/components/layout/layout";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {object, string} from "yup";

interface Props {
    isDialogOpen: boolean;
    onDialogClosed: (password: string) => void;
}

const formSchema = object().shape({
    password: string()
        .min(4, 'رمز عبور باید حداقل ۴ کاراکتر باشد')
        .max(32, 'رمز عبور باید حداکثر ۳۲ کاراکتر باشد')
        .required()
});

export default function PasswordDialog(props: Props) {
    const inputRef = useRef(null);

    return (
        <Transition.Root show={props.isDialogOpen} as={Fragment}>
            <Dialog className={`relative z-10 ${vazirmatn.variable} font-sans`}
                    initialFocus={inputRef}
                    onClose={() => false}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"/>
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex flex-col gap-y-4 justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="w-16 h-16 stroke-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                        </svg>
                                        <p className="text-center text-xl mb-4">فایل ها با کلمه عبور محافظت شده اند</p>
                                            <Formik
                                                initialValues={{password: ""}}
                                                validationSchema={formSchema}
                                                onSubmit={(values, formikHelpers) => {
                                                        formikHelpers.setSubmitting(false);
                                                        props.onDialogClosed(values.password);
                                                    }}>
                                                {({isSubmitting, isValid}) => (
                                                    <>
                                                        <Form className="flex w-full items-center gap-x-2">
                                                            <Field
                                                                type="password"
                                                                name="password"
                                                                className="w-full py-2 px-4 border border-gray-300 rounded-lg"
                                                                autocomplete="new-password"
                                                            />
                                                            <button
                                                                type="submit"
                                                                disabled={isSubmitting || !isValid}
                                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:text-white"
                                                            >
                                                                تایید
                                                            </button>
                                                        </Form>
                                                        <ErrorMessage
                                                            component="p"
                                                            name="password"
                                                            className="text-start text-red-500 text-sm"
                                                        />
                                                    </>
                                                )}
                                            </Formik>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}