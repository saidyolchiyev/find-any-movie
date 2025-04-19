import React from "react";

export const SortingForm = ({ form, setForm }) => {
  return (
    <div
      className="md:ml-auto flex flex-col md:flex-row"
      value={form.sort}
      onChange={(e) => setForm((prev) => ({ ...prev, sort: e.target.value }))}
    >
      <select className="border-2 border-neutral-300 rounded text-white pl-2 py-2 outline-none md:mx-2 mb-2 md:mb-0 md:max-w-[200px] w-full">
        <option value="" className="text-black">
          Sort by ..
        </option>
        <option value="popularity" className="text-black">
          Popularity (high to low)
        </option>
        <option value="release_date" className="text-black">
          Release Date (newest)
        </option>
        <option value="vote_average" className="text-black">
          Rating (high to low)
        </option>
        <option value="title" className="text-black">
          Title (A-Z)
        </option>
      </select>
      <input
        type="text"
        className="border-2 border-neutral-300 rounded text-white md:ml-auto px-5 py-2 outline-none md:max-w-[300px] w-full"
        placeholder="Search"
        value={form.search}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, search: e.target.value }))
        }
      />
    </div>
  );
};
