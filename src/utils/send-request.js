const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWVlMDAzZjlhYzg4ODAzMDIzNTYzYmU1ZjRhMGI1YiIsIm5iZiI6MTc0NDc4NjMxNS45MTYsInN1YiI6IjY3ZmY1MzhiZDY0NWU0MWUwOTk5NDk1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iVY06OV-_x10bWTB_Fnlv_hwSgrJoA7FWsJkw17yFA";

export const sendRequest = async (URL) => {
  const res = await fetch(URL, {
    headers: {
      Authorization: TOKEN,
    },
  });

  const data = await res.json();
  return data;
};
