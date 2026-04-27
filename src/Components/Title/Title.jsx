function Title({ texto }) {
  return (
    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-sm mb-6">
      {texto}
    </h2>
  );
}

export default Title;
