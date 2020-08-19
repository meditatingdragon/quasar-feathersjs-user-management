export function setUsers(state, users) {
  state.users = [...users];
}

export function setUserPagination(state, payload) {
  state.userPaginationOpts = payload.userPaginationOpts;
}

export function setUserCount(state, count) {
  state.userPaginationOpts.rowsNumber = count;
}
