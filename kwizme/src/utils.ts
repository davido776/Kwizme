export const shuffleOptions=(array:any[])=>{
    [...array].sort(()=>Math.random()-0.5);
}