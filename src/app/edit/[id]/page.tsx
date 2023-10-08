
import AddAnuncio from "@/components/AddAnuncio";

import { fetchAnunciosById } from "@/services/api";

export default async function Add({ params }: { params: { id: string }}) {
   const id=params.id;
  return (
    <main>
      <AddAnuncio/>
    </main>
  )

  }
