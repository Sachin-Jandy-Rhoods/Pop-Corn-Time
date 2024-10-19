import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { IoClose } from "react-icons/io5";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
    const cancelButtonRef = useRef(null);

    return (
        <>
            <Transition show={modalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-30 overflow-y-auto text-center"
                    initialFocus={cancelButtonRef}
                    onClose={() => setModalOpen(false)} // Closes modal on background click
                >
                    <div className="min-h-screen px-4 flex items-center justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black opacity-60" />
                        </Transition.Child>

                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-6/12 bg-white text-left shadow-xl transform transition-all align-middle rounded-lg relative">
                                {children}

                                {/* Close button in the corner, outside the dialog */}
                                <button
                                    onClick={() => setModalOpen(false)}
                                    type="button"
                                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-base font-extrabold text-main bg-white rounded-full hover:bg-subMain"
                                    ref={cancelButtonRef}
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MainModal;
