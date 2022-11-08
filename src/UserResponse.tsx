import User from "./User";

export default class UserResponse
{
  page?: number;
  par_page?: number;
  total?: number;
  total_pages?: number;
  data?: User[];
}
