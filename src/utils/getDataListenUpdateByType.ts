import { WsUpdateType } from "@/libs/constants/wsUpdateType";

export const getDataListenUpdateByType = (data: any[], type: WsUpdateType) => {
  return data?.find((d) => d.type_data === type);
};
