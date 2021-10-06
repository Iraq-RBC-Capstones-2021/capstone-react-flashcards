function Search() {
  return (
    <div className="relative flex flex-wrap items-stretch m-4">
      <span className="z-10 px-2 content-center self-center leading-snug text-center absolute bg-transparent rounded text-base items-center justify-center">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.7071 21.2929L16.7164 15.3022C18.0196 13.6888 18.8 11.6355 18.8 9.4C18.8 4.20852 14.5915 0 9.4 0C4.20852 0 0 4.20852 0 9.4C0 14.5915 4.20852 18.8 9.4 18.8C11.6355 18.8 13.6888 18.0196 15.3022 16.7164L21.2929 22.7071C21.6834 23.0976 22.3166 23.0976 22.7071 22.7071C23.0976 22.3166 23.0976 21.6834 22.7071 21.2929ZM16.8 9.4C16.8 13.4869 13.4869 16.8 9.4 16.8C5.31309 16.8 2 13.4869 2 9.4C2 5.31309 5.31309 2 9.4 2C13.4869 2 16.8 5.31309 16.8 9.4Z"
            fill="#1A1A1A"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search Study Sets"
        className="px-2 py-0 placeholder-gray-400 text-gray-600 relative bg-white rounded border-black border-2 focus:outline-none focus:ring w-full pl-10"
      />
    </div>
  );
}
export default Search;
