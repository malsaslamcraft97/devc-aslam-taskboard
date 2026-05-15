export default function TaskBoardHeader() {
  return (
    <header>
      <div className="flex items-center gap-2">
        <img src="/Logo.svg" alt="My Task Board logo" className="w-10 h-10 flex-shrink-0" />
        <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight">
          My Task Board
        </h1>
        <button
          aria-label="Edit board title"
          className="ml-0.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <img src="/Edit_duotone.svg" alt="" className="w-5 h-5" />
        </button>
      </div>
      <p className="mt-1.5 text-sm text-gray-400 font-semibold">Tasks to keep organised</p>
    </header>
  );
}
