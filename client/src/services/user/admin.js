import { Notify } from "quasar";
import feathersClient from "../../boot/feathersClient";
import axiosInstance from "../../boot/axios";

export async function getUsers(opts) {
  let pagination = { query: { $sort: { descending: 1 } } };
  if (opts) {
    pagination.query.$limit = opts.rowsPerPage;
    pagination.query.$skip = (opts.page - 1) * opts.rowsPerPage;
    if (opts.sortBy) {
      pagination.query.$sort[opts.sortBy] = opts.descending ? 1 : -1;
    }
  } else {
    pagination.query.$limit = 5;
  }
  return feathersClient.service("users").find(pagination);
}
