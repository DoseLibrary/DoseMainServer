import { useGetContentServersQuery } from "../../features/main-server/mainServerApiSlice";
import { Server } from "./components/Server";

export const ServerSelectorView = () => {
  const { data: servers } = useGetContentServersQuery();

  const renderServers = () => {
    return servers?.map(server => (
      <Server key={server.id} id={server.id} />
    ));
  }

  return (
    <div className="h-full w-full flex items-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold font-roboto">Select a server</h1>
        <div className="justify-center flex">
          {renderServers()}
        </div>
      </div>
    </div>
  );
};