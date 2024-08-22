import { useAppDispatch } from "../../../app/hooks";
import { Button } from "../../../core";
import { useGetContentServersQuery } from "../../../features/main-server/mainServerApiSlice";
import { setActiveContentServer } from "../../../features/session/sessionSlice";
import { addErrorToast } from "../../../features/toast/toastSlice";

interface ServerProps {
  id: number;
}

export const Server = ({
  id
}: ServerProps) => {
  const { data: servers } = useGetContentServersQuery();
  const server = servers?.find(server => server.id === id);
  const dispatch = useAppDispatch();

  const onSelect = () => {
    if (!server) return;
    dispatch(setActiveContentServer(server))
      .catch(err => dispatch(addErrorToast(err.message)));
  }

  return (
    <div className={`
      bg-gray-200
      dark:bg-gray-800
      p-4
      rounded-lg
      shadow-md
      m-4
      flex
      flex-col
      items-center
      font-roboto
      w-52
      h-60
      relative
`}>
      <h1 className="text-2xl font-bold" >{server?.name}</h1>
      <p className="text-xs">{server?.url}</p>
      <div className="mt-auto">
        <Button label="Select" size="small" onClick={onSelect} />
      </div>
    </div>
  );
}