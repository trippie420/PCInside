export default function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
      <div className="card p-4">
        <div className="h-8 skel mb-3" style={{width:'60%'}}/>
        {Array.from({length:6}).map((_,i)=>(<div key={i} className="h-10 skel my-2"/>))}
      </div>
      <div className="space-y-4">
        <div className="h-8 skel"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({length:8}).map((_,i)=>(<div key={i} className="h-56 skel"/>))}
        </div>
      </div>
    </div>
  )
}
