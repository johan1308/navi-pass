import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { FormUpdatePrincipal } from "./components/forms/FormUpdatePrincipal";
import { FormUpdAditional } from "./components/forms/FormUpdAditional";
import { useQuery } from "react-query";
import { getCredentialsID } from "../Home/api/HomeAPi";
import { Credentials } from "../Home/interfaces/CredentialsInterfaces";
import { useState } from "react";
import { Loading } from "../../../../components/Loading";
import { getCookie } from "../../../../config/cookies";
import queryString from "query-string";

const initialState: Credentials = {
  id: 0,
  user: "",
  password: "",
  description: "",
  sub_category_id: 0,
  created_at: "",
  updated_at: "",
  additional_information: [],
};

export const PassIDViews = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const parseId = Number(id);
  const [credentials, setCredentials] = useState(initialState);
  const { isLoading } = useQuery(
    ["credential", { id: parseId }],
    () => getCredentialsID(parseId),
    {
      refetchOnWindowFocus: false,
      onSuccess: ({ data }) => {
        const { data: info } = data;
        setCredentials(info);
      },
      staleTime: 0,
    }
  );

  const handleNavigate = () => {
    navigation(-1);
  };
  return (
    <>
      <Button
        color="primary"
        className="ml-6"
        startContent={<FaArrowLeft />}
        onClick={handleNavigate}
      >
        Atrás
      </Button>
      <div className="grid  grid-cols-3  gap-4 pt-10">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center flex-1 ">
            <Loading />
          </div>
        ) : (
          <>
            <FormUpdatePrincipal credential={credentials} />
            <FormUpdAditional
              additionalInformation={credentials.additional_information}
            />
          </>
        )}
      </div>
    </>
  );
};
