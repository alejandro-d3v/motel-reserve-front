import { LoaderFunctionArgs } from "react-router-dom";

async function initDataResolver({ request }: LoaderFunctionArgs) {
  console.log('initDataResolver OK...', request);
  return true;
}

export { initDataResolver };