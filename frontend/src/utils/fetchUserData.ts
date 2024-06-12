interface User {
  username: string;
  uid: string;
}

interface UserProfile {
  userUid: string;
  address: string;
  birthdate: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchUserProfiles = async (): Promise<UserProfile[]> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user profiles");
  }
  return response.json();
};
