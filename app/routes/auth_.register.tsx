import { ActionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return {};
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === "get") {
  }

  if (request.method.toLowerCase() === "post") {
  }

  if (request.method.toLowerCase() === "patch") {
  }

  if (request.method.toLowerCase() === "delete") {
  }
}

export default function Register() {
  const data = useLoaderData<typeof loader>();
}
