import { json, useLoaderData} from "remix"

export const loader = async () => {
  // se ejecuta en el server. Es un http proxy
  // observar que no usa await y usa fetch (se supone que no está soportado en node.js)
  return fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'text/plain',
    },
  })
}
export default function Schedule() {
  const data = useLoaderData()

  return (
    <div>
      <h1>Schedule</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}