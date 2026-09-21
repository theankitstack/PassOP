
const Navbar = () => {
  return (
    <nav className="bg-purple-200">

      <div className="mycontainer flex justify-between items-center px-4 py-5 h-12">

        <div className="logo font-bold text-black text-2xl">

          <h1 className="text-2xl text font-bold">
            <span className="text-purple-500">&lt;</span>
            <span>Pass</span><span className="text-purple-500">OP/&gt;</span>
          </h1>
        </div>

        <div className="flex gap-1 rounded-full p-1 border border-black-500">
          <img className="w-6" src="/public/github.png" alt="github" />
          <a className="flex justify-between items-center font-bold" href="https://github.com/theankitstack">GitHub</a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
