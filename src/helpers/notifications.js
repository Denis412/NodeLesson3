import { Notify } from "quasar";

const topNotify = (type, message) =>
  Notify.create({ type, position: "top", message });
const bottomNotify = (type, message) =>
  Notify.create({ type, position: "bottom", message });

export const topPositiveNotify = (message) => topNotify("positive", message);
export const topNegativeNotify = (message) => topNotify("negative", message);
export const topWarningNotify = (message) => topNotify("warning", message);

export const bottomPositiveNotify = (message) =>
  bottomNotify("positive", message);
export const bottomNegativeNotify = (message) =>
  bottomNotify("negative", message);
export const bottomWarningNotify = (message) =>
  bottomNotify("warning", message);
