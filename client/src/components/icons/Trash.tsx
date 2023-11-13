import type { ButtonBaseProps } from "../button";
import { ButtonBase } from "../button/ButtonBase";
import { ScalableSVG } from "./index.d";

export function Trash({
  color,
  onClick,
  title,
}: ButtonBaseProps) {
  return (
    <ButtonBase onClick={onClick} title={title}>
      <ScalableSVG
        xmlns='http://www.w3.org/2000/svg'
        height='24px'
        viewBox='0 0 24 24'
        width='24px'
        fill={color}
      >
        <path d="M7,11 L7,20.0046024 C7,20.5443356 7.4463856,21 7.99703014,21 L16.0029699,21 C16.5469637,21 17,20.5543453 17,20.0046024 L17,11 M19,12.7614154 L19,20.0046024 C19,21.6594336 17.651048,23 16.0029699,23 L7.99703014,23 C6.34288264,23 5,21.6500037 5,20.0046024 L5,12.7618354 C3.83357183,12.3098376 3,11.2589309 3,9.9951185 L3,9.0048815 C3,7.31396443 4.49363187,6 6.28087391,6 L17.7142857,6 C19.5031216,6 21,7.31128432 21,9.0048815 L21,9.9951185 C21,11.2585499 20.1701528,12.3091895 19,12.7614154 Z M6.29240963,11 L17.7122393,11 C18.457386,11 19,10.5228583 19,9.9951185 L19,9.0048815 C19,8.47908224 18.4531103,8 17.7142857,8 L6.28087391,8 C5.54522355,8 5,8.47963918 5,9.0048815 L5,9.9951185 C5,10.5209046 5.5469333,11 6.2924099,11 Z M16,5 L14,5 C14,3.8954305 13.1045695,3 12,3 C10.8954305,3 10,3.8954305 10,5 L8,5 C8,2.790861 9.790861,1 12,1 C14.209139,1 16,2.790861 16,5 Z M9,11.9975446 L9,19.0024554 C9,19.5536886 9.44771525,20 10,20 C10.5561352,20 11,19.553384 11,19.0024554 L11,11.9975446 C11,11.4463114 10.5522847,11 10,11 C9.44386482,11 9,11.446616 9,11.9975446 Z M13,11.9975446 L13,19.0024554 C13,19.5536886 13.4477153,20 14,20 C14.5561352,20 15,19.553384 15,19.0024554 L15,11.9975446 C15,11.4463114 14.5522847,11 14,11 C13.4438648,11 13,11.446616 13,11.9975446 Z" id="Combined-Shape" />
      </ScalableSVG>
    </ButtonBase>
  );
}