
export default function StudentVerificationButton({ className = "",title="Student Verification", description="Verify your account with your Student ID Card." }: { className?: string,title?: string,description?: string }) {

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>

                <p className="mt-1 text-sm text-gray-600">
                    {description}
                </p>
            </header>

            <div className="flex items-center gap-4 mt-2">
                <a href='/students/verify' className='text-whiteinline-flex items-center px-4 py-2 bg-[#b99a45] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#1a1a1a] focus:bg-gray-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c7ae6a] focus:ring-offset-2 transition ease-in-out duration-150'>Proceed</a>
            </div>
        </section>
    );
}
