import { useState, useEffect } from "react";
import { fetchGroupsForUser } from "../../utils/api";
import UserLayout from "../../layouts/UserLayout";
import GroupsList from "./GroupsList";
import CreateGroup from "./CreateGroup";
import { useAuth } from "../../context/AuthContext";

const GroupsPage = () => {
  const { user } = useAuth(); // Preluam utilizatorul autentificat
  const [groups, setGroups] = useState([]); // Stocam grupurile utilizatorului

  // Functie pentru a reimprospata lista de grupuri
  const refreshGroups = async () => {
    if (!user?.id) return; // Verificam daca utilizatorul este conectat
    try {
      const data = await fetchGroupsForUser(user.id); // Obtinem grupurile pentru utilizatorul curent
      setGroups(data); // Actualizam starea cu grupurile obtinute
    } catch (error) {
      console.error("Error refreshing groups:", error); // Afisam eroarea in consola
    }
  };

  // Apelam refreshGroups atunci cand se monteaza componenta sau cand se schimba ID-ul utilizatorului
  useEffect(() => {
    refreshGroups();
  }, [user?.id]);

  // Adaugam un nou grup in lista dupa ce a fost creat
  const handleGroupCreated = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  return (
    <UserLayout>
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 mx-auto mt-10">
        {/* Header cu titlu si buton pentru creare grup */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#DC602E] mb-6">My Groups</h1>
          {user?.id && (
            <CreateGroup
              onGroupCreated={handleGroupCreated}
              userId={user.id}
              className="w-full py-2 bg-[#05A8AA] text-white font-semibold rounded-lg hover:bg-[#028c8e] transition duration-300"
            />
          )}
        </div>

        {/* Afisam grupurile utilizatorului sau un mesaj daca nu exista grupuri */}
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <GroupsList
                key={group.id}
                group={group}
                userId={user.id}
                onUpdate={refreshGroups} // Transmitem refreshGroups pentru actualizari dinamice
              />
            ))}
          </div>
        ) : (
          <p>You are not a member of any groups.</p>
        )}
      </div>
    </UserLayout>
  );
};

export default GroupsPage;
