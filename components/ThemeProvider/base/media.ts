import {
  up as upFromLib,
  down as downFromLib,
  between as betweenFromLib,
  only as onlyFromLib,
} from "styled-breakpoints";

import { Breakpoint } from "./breakpoints";

type Orientation = "portrait" | "landscape" | undefined;

const up = (x: Breakpoint, y?: Orientation) => upFromLib(x, y);

const down = (x: Breakpoint, y?: Orientation) => downFromLib(x, y);

const between = (a: Breakpoint, b: Breakpoint, y?: Orientation) =>
  betweenFromLib(a, b, y);

const only = (x: Breakpoint, y?: Orientation) => onlyFromLib(x, y);

export const media = {
  up,
  down,
  between,
  only,
};
