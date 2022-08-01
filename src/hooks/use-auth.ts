import { useContext } from 'react';

import { AuthContext } from 'hocs';

export const useAuth = () => useContext(AuthContext);
