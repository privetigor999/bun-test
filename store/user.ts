import { createStore, createEvent, Store } from 'effector';

import type { IUser } from '@/interface/user';

const setUser = createEvent<IUser | null>();
const $user: Store<IUser | null> = createStore<IUser | null>(null);

$user.on(setUser, (_, user) => user);

export { setUser, $user };
