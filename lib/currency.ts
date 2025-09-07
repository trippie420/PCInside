export function formatEUR(v:number){ return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(v) }
