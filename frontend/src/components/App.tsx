import { useCallback, useEffect, useState } from 'react';

import { BASE_URL } from '../constants';

interface IUser {
  id: number;
  email: string;
  password: string;
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [idInAction, setIdInAction] = useState<number>();
  const [creatingUser, setCreatingUser] = useState<boolean>(false);

  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const [searchEmail, setSearchEmail] = useState('');

  const loadUsers = useCallback(async () => {
    const users = (await (await fetch(`${BASE_URL}/user`)).json()) as IUser[];
    setUsers(users);
  }, [creatingUser, editMode]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function editUser(id: number) {
    setEditMode(true);
    setIdInAction(id);
  }

  async function applyEdit() {
    await fetch(`${BASE_URL}/user/${idInAction}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: editEmail,
        password: editPassword,
      }),
    });

    setEditMode(false);
  }

  async function deleteUser(id: number) {
    const deleteApproved = window.confirm(`Excluir user id ${id} ?`);

    if (deleteApproved) {
      await fetch(`${BASE_URL}/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
    }
  }

  function createUser() {
    setNewUserEmail('');
    setNewUserPassword('');

    setCreatingUser(true);
  }

  async function applyCreateUser() {
    if (!newUserEmail || !newUserPassword) {
      return;
    }

    await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: newUserEmail,
        password: newUserPassword,
      }),
    });

    setCreatingUser(false);
  }

  function handleNewUserEmailChange(event: { target: HTMLInputElement }) {
    setNewUserEmail(event.target.value);
  }

  function handleNewUserPasswordChange(event: { target: HTMLInputElement }) {
    setNewUserPassword(event.target.value);
  }

  function handleEditPassword(event: { target: HTMLInputElement }) {
    setEditPassword(event.target.value);
  }

  function handleEditEmail(event: { target: HTMLInputElement }) {
    setEditEmail(event.target.value);
  }

  async function handleSearchEmail(event: { target: HTMLInputElement }) {
    setSearchEmail(event.target.value);

    const data = await fetch(`${BASE_URL}/user?searchEmail=${event.target.value}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const users = await data.json();
    setUsers(users);
  }

  return (
    <div className="flex items-center mt-4 flex-col w-[700px] mx-auto">
      <header className="">
        <h1 className="text text-xl">User's CRUD</h1>
      </header>

      <main className="w-full mt-6">
        <div className="flex justify-center">
          <input
            type="text"
            className="mr-6 px-3 py-2 w-full focus:outline-none"
            placeholder="search by email"
            onChange={handleSearchEmail}
            value={searchEmail}
          />
          <button
            onClick={createUser}
            className="bg-white px-6 hover:bg-green-200 hover:text-green-700 duration-300"
          >
            create
          </button>
        </div>

        {creatingUser && (
          <div className="flex justify-between mt-6 bg-white px-4 py-2 items-center">
            <input
              type="mail"
              className="focus:outline-none "
              placeholder="email"
              value={newUserEmail}
              onChange={handleNewUserEmailChange}
            />
            <input
              type="password"
              className="focus:outline-none "
              placeholder="senha"
              value={newUserPassword}
              onChange={handleNewUserPasswordChange}
            />
            <div>
              <button
                onClick={applyCreateUser}
                className="hover:text-blue-200 text-blue-700 duration-300 p-3"
              >
                criar
              </button>
              <button
                onClick={() => {
                  setCreatingUser(false);
                }}
                className="hover:text-red-200 text-red-700 duration-300 p-3"
              >
                cancelar
              </button>
            </div>
          </div>
        )}

        <div className={`${creatingUser && 'blur - sm'}`}>
          {users.map((user: IUser) => (
            <div
              className="flex justify-between mt-6 bg-white px-4 py-2 items-center min-h-[64px]"
              key={user.id}
            >
              <div className="font-semibold">{user.id}</div>
              {!!(editMode && idInAction === user.id) ? (
                <input
                  type="text"
                  className="bg-slate-50 focus:outline-none p-3 mr-2"
                  onChange={handleEditEmail}
                  value={editEmail}
                />
              ) : (
                <div>{user.email}</div>
              )}
              {!!(editMode && idInAction === user.id) ? (
                <input
                  type="password"
                  className="bg-slate-50 focus:outline-none p-3"
                  onChange={handleEditPassword}
                  value={editPassword}
                />
              ) : (
                <div>******</div>
              )}
              <div>
                {!!(editMode && idInAction === user.id) && (
                  <button
                    onClick={applyEdit}
                    className="mr-2 hover:text-blue-200 text-blue-700 duration-300"
                  >
                    aplicar
                  </button>
                )}
                {!editMode && (
                  <button
                    onClick={() => editUser(user.id)}
                    className="mr-2 hover:text-blue-200 text-blue-700 duration-300"
                  >
                    edit
                  </button>
                )}

                {!!(editMode && idInAction === user.id) && (
                  <button
                    onClick={() => {
                      setEditMode(false);
                    }}
                    className="hover:text-red-200 text-red-700 duration-300 p-3"
                  >
                    cancelar
                  </button>
                )}
                {!editMode && (
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="hover:text-red-200 text-red-700 duration-300 p-3"
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
