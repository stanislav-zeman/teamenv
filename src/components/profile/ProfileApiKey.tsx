'use client'
import {FC, useEffect, useState} from 'react';
import {Button} from '@chakra-ui/react';
import axios from "axios";
import environment from "@/utils/envMetadata";
import {APIKey} from "@/repositories/user/types/data";

const getApiKey = async () : Promise<APIKey> => {
  return await axios
    .get(
      `${environment.HOST}/api/users/apikey`
    )
    .then((res) => res.data);
};

const resetApiKey = async () : Promise<APIKey> => {
  return await axios
    .post(
      `${environment.HOST}/api/users/apikey`
    )
    .then((res) => res.data);
};

const UserAPIKey: FC = () => {
  const [apiKey, setApiKey] = useState("")

  useEffect(() => {
    getApiKey().then((key) => setApiKey(key));
  })

  return (
    <div className="flex flex-row justify-items-start items-center m-5 w-full rounded-2xl h-10 max-h-[44em]">
        <Button className="m-2" onClick={() => navigator.clipboard.writeText(apiKey).then(_ => _)}>Copy API key</Button>
        <Button className="m-2" onClick={() => resetApiKey().then(key => setApiKey(key))}>Reset API key</Button>
    </div>
  );
};

export default UserAPIKey;