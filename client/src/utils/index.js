export const GET_ALL_URL = "http://localhost:3001/dogs";
export const GET_TEMPERAMENT_URL = "http://localhost:3001/temperament";
export const POST_DOG_URL = "http://localhost:3001/dog";

export const sortDogs = (array,value) => {
    if(value === 'name_A') return array.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    if(value === "name_D") return array.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0)) 
    if(value === 'weight_A') return array.sort((a,b) => (parseInt(a.weight.split("-")[0]) > parseInt(b.weight.split("-")[0])) ? 1 : ((parseInt(b.weight.split("-")[0]) > parseInt(a.weight.split("-")[0])) ? -1 : 0))
    if(value === "weight_D") return array.sort((a,b) => (parseInt(a.weight.split("-")[0]) > parseInt(b.weight.split("-")[0])) ? -1 : ((parseInt(b.weight.split("-")[0]) > parseInt(a.weight.split("-")[0])) ? 1 : 0))
}

export const filterDogs = (array, value, display) => {
    if(display === "created") {
        array = array.filter(e => isNaN(Number(e.id)))
    }
    if(value.length > 0){
        array = array.map(e => e = {
            ...e,
            temperaments: e.temperaments && e.temperaments.map(e => e = e.temperament)
        });
        array = array.filter(e => value.sort().every(v => e.temperaments && e.temperaments.sort().includes(v)));
    }
    return array;
}

