import { json, useLoaderData} from "remix"

export const loader = async () => {
  // se ejecuta en el server. Es un http proxy
  // observar que no usa await y usa fetch (se supone que no está soportado en node.js)
  /*
  return fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'text/plain',
    },
  })
  */

  // otra forma. Le decimos en la cabecera lo que esperamos.
  /* const data = await fetch('https://icanhazdadjoke.com/',{
    headers: {
      Accept: 'text/plain',
    },
  }).then(res => res.text()) */

  // llamando a la API de Sanity
  const response = await fetch(
    'https://vnkupgyb.api.sanity.io/v2021-06-07/data/query/production?query=*[]{title,date}',
  );

  // should do error check
  const data = await response.json();

  const today = new Date();

  const schedule = data.result.filter(
    (episode) => new Date(episode.date) > today,
  );

  return schedule;
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