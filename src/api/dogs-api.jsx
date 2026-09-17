const apiURL = "https://api.jsonbin.io/v3/b/6aa7c2faffd5d160530465bf";
const ACCESS_KEY =
  "$2a$10$zXa7BhCgKbQSrVOx5p3dQuV6kdmQ5SzMEZV4dY.dQf9zWxmkNKro.";

export async function getAllDogs() {
  const response = await fetch(apiURL, {
    headers: {
      "X-Access-Key": ACCESS_KEY,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch dogs");
  const data = await response.json();
  return data.record;
}

export async function updateBin(dogs) {
  const res = await fetch(apiURL, {
    method: "PUT",
    headers: {
      "X-Access-Key": ACCESS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogs),
  });
  if (!res.ok) throw new Error(`update failed: ${res.status}`);
}


