export default function Loading() {
  return (
    <div className="container my-8 space-y-8">
      <section className="rounded-2xl p-10 skel" style={{height:220}}/>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} className="card p-3">
            <div className="h-40 skel"/>
            <div className="h-4 skel mt-3"/>
            <div className="h-4 skel mt-2" style={{width:'70%'}}/>
            <div className="h-8 skel mt-4"/>
          </div>
        ))}
      </div>
    </div>
  )
}
