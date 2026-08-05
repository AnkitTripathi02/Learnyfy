interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModuleModal = ({
    open,
    onClose,
    children,
}: Props) => {

    if (!open) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">


            <div className="w-full max-w-lg rounded-2xl border border-[#2c2545] bg-[#161122] p-6">


                <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-white">
                        Add Module
                    </h2>


                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>


                </div>


                {children}


            </div>


        </div>
    );
};


export default ModuleModal;