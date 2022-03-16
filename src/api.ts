const BASE_URL = "https://picsum.photos";

export const fetchPhotos = async (page: number) => {
  return await fetch(BASE_URL + `/v2/list?page=${page}&limit=28`).then((res) =>
    res.json()
  );
};

export const fetchPhoto = async (id: number) => {
  return await fetch(BASE_URL + `/id/${id}/info`).then((res) => res.json());
};
