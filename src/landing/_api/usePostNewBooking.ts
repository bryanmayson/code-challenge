import { API_REQUEST_INVITE } from "@/_api/endpoint";
import { postJson } from "@/_api/requestSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface RequestInviteReq {
  name: string;
  email: string;
}

type RequestInviteResp = AxiosResponse<string>;

const postRequestInvite = (
  payload: RequestInviteReq
): Promise<RequestInviteResp> =>
  postJson({ url: API_REQUEST_INVITE, data: payload });

export const usePostRequestInvite = () => {
  return useMutation({
    mutationKey: [API_REQUEST_INVITE],
    mutationFn: postRequestInvite,
  });
};
