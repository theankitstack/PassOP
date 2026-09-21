
const Footer = () => {
    return (
            <div className='footer md:p-0 bg-purple-300 text-black gap-0 w-full'>

                <div className="logo font-bold text-black text-2xl flex justify-center items-center">
                    <h1 className="text-2xl text font-bold">
                        <span className="text-purple-500">&lt;</span>
                        <span>Pass</span><span className="text-purple-500">OP/&gt;</span>
                    </h1>
                </div>

                <div className='flex items-center justify-center' >
                    Created with
                    <span><img className='w-7' src="/public/favorite.png" alt="heart" /></span>
                    by CodeWithAnkit</div>
            </div>
    )
}

export default Footer
