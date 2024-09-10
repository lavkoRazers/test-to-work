import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchUsers, setFilter } from './usersSlice';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, filters } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const filteredUsers = users.filter((user) =>
      Object.keys(filters).every((key) =>
          user[key as keyof typeof user].toString().toLowerCase().includes(filters[key as keyof typeof filters].toLowerCase())
      )
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div>
        <h1>User Management Table</h1>
        <table>
          <thead>
          <tr>
            <th>
              Name
              <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </th>
            <th>
              Username
              <input
                  type="text"
                  value={filters.username}
                  onChange={(e) => handleFilterChange('username', e.target.value)}
              />
            </th>
            <th>
              Email
              <input
                  type="text"
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </th>
            <th>
              Phone
              <input
                  type="text"
                  value={filters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
              />
            </th>
          </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default UserTable;