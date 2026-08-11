//T(x)
export function calcularLatenciaPromedio(capacidad,carga){
    return 1/(capacidad-carga)
}

//D(x)
export function calcularRetrasoAcumulado(carga,latenciaPromedio){
    return carga*latenciaPromedio
}
//D´(x)
export function calcularCostoMarginal(capacidad,carga){
    return (capacidad/(Math.pow(capacidad-carga,2))).toFixed(4)
}

/*
Lagrange
L peticiones

*/
export function calcularCargaOptima(L,servidores){
    const sumaDeCapacidades=servidores.reduce((a,b)=>a+b.capacidad,0)
    const capacidadRemanente=sumaDeCapacidades-L
    const sumaDeRaices = servidores.reduce((a,b)=>a+Math.sqrt(b.capacidad),0)
    const K=(capacidadRemanente/sumaDeRaices)

    const capacidades = servidores.map(servidor=>{
        const asignadas=(servidor.capacidad-Math.sqrt(servidor.capacidad)*K).toFixed(2)

        return {
            ...servidor,
            K:K.toFixed(4),
            raiz:Math.sqrt(servidor.capacidad),
            costoMarginal:calcularCostoMarginal(servidor.capacidad,asignadas),
            asignadas: asignadas
        }
    })
    return capacidades
}
