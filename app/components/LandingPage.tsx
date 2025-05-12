const LandingPage = () => {
  return (
    <div className="h-dvh w-dvw">
      <nav className="flex justify-between w-full border-b-1 border-slate-700 p-2">
        <a href="/" className="text-3xl ">Memento</a>
        <button className="px-2 py-1 text-xl">
          <a href="/login">Login</a>
        </button>
      </nav>
    </div>
  );
};

export default LandingPage;
