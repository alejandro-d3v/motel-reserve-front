import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import UsersForm from "../components/UsersForm";
import AppLoading from "../../../shared/components/AppLoading";

import { UserWithRoleDto } from "../../../shared/dto/user.dto";

import { GetUserService } from "../services/getUser.service";

const getUserService = new GetUserService();

export default function UsersEdit () {
  const params = useParams();

  const [user, setUser] = useState<UserWithRoleDto | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setUser(await getUserService.run(params.userId));
      setLoading(false);
    };
  
    getData();
  }, []);

  return (
    <>
      {loading ? ( <AppLoading /> ) : (
        <UsersForm user={ user } />
      )}
    </>
  );
}