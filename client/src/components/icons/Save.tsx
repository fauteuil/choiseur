import type { ButtonBaseProps } from "../button";
import { ButtonBase } from "../button/ButtonBase";
import { ScalableSVG } from "./index.d";

export function Save({
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
        <path d="M8.86388067,14.6265915 L6.69441297,12.4825784 C6.31475581,12.1073758 5.68268375,12.1051099 5.2942477,12.4889884 C4.90310355,12.8755432 4.90290773,13.492387 5.28776161,13.8727254 L8.11403652,16.6658392 C8.11532712,16.6671147 8.11662064,16.6683858 8.11791706,16.6696527 C8.13118058,16.6844193 8.1449751,16.6988931 8.15930112,16.713051 C8.54773717,17.0969295 9.17836391,17.096092 9.57121615,16.7078491 L18.7039227,7.68229783 C19.0952658,7.29554641 19.1003305,6.67350378 18.7091863,6.28694897 C18.3207503,5.9030705 17.6901235,5.90390803 17.2972713,6.29215089 L8.86388067,14.6265915 L8.86388067,14.6265915 Z" id="Combined-Shape"></path>

      </ScalableSVG>
    </ButtonBase>
  );
}
