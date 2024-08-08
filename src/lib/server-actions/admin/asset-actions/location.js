export const getProvinces = async () => {
  try {
    let res = await fetch(`https://apis.datos.gob.ar/georef/api/provincias?orden=nombre`, {
      method: "GET",
    });
    let provinces = await res.json()

    return provinces
  } catch (error) {
    console.error(error);
  }
}

export const getLocation = async (idProvince) => {

  try {

    let res = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvince}&campos=id,nombre&orden=nombre&max=1000`, {
      method: "GET",
    });

    let locations = await res.json()

    return locations
  } catch (error) {

    console.error(error);
  }
}