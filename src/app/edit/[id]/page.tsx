

import AnunciosEdit from "@/components/EidtAnuncio";



export default async function Add({ params }: { params: { id: string }}) {
   const id=params.id;
  return (
    <main>
      <AnunciosEdit id={id}/>
    </main>
  )

  }
