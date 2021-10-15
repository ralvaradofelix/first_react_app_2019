import axios from "axios";
import { url_backend } from "./../credentials";

export function saveFile(formData) {
  return axios.post(url_backend + "api/user-profile", formData, {});
}
export function getFiles() {
  return axios.get(url_backend + "api/", {});
}
export function getDirectories() {
  return axios.get(url_backend + "carpeta/ver_carpetas", {});
}
export function getFiles_by_ruta(ruta) {
  return axios.post(url_backend + "api/files_by_ruta", {
    params: {
      ruta: ruta
    }
  });
}
export function getFolders_by_ruta(ruta) {
  return axios.post(url_backend + "carpeta/directories_by_ruta", {
    params: {
      ruta: ruta
    }
  });
}
export function delFile(id) {
  return axios({
    method: "delete",
    url: url_backend + "api/del_doc",
    data: {
      id: id
    }
  });
}
export function delFolder(id) {
  console.log("Hey");
  console.log(id);
  var f = null;
  GetDataDirectoryById(id).then(res => {
    f = res.data.datos[0].slug;
    DeleteFolderContent(f);
  });

  return axios({
    method: "delete",
    url: url_backend + "carpeta/del_carp",
    data: {
      id: id
    }
  });
}

export function DeleteFolderContent(slug) {
  return axios.post(url_backend + "api/DeleteFolderContent", {
    slug
  });
}

export function saveDirectory(nombre, nivel, fecha, ruta) {
  return axios.post(url_backend + "carpeta/save_directory", {
    name: nombre.carpeta,
    title: nombre.title,
    description: nombre.description,
    nivel: nivel,
    fecha: fecha,
    ruta: ruta
  });
}
export function ExistsOrNot(ruta) {
  return axios.post(url_backend + "carpeta/exist_directory", {
    ruta: ruta
  });
}
export function GetDirectory(ruta) {
  return axios.post(url_backend + "carpeta/getDirectory", {
    ruta: ruta
  });
}
export function downloadFile() {
  return axios.get(url_backend + "api/download", {});
}
export function GetDataDirectoryById(id) {
  return axios.post(url_backend + "carpeta/getDirectoryById", {
    id: id
  });
}
export function UpdateDirectoryById(id, title, description, name) {
  return axios.post(url_backend + "carpeta/updateDirectoryById", {
    form: {
      id,
      title,
      description,
      name
    }
  });
}
export function GetEstadoConeccion() {
  return axios.get(url_backend + "api/itworks", {});
}

export function getNombreBackend(nombre, ruta) {
  return axios.post(url_backend + "api/GetNombreBackend", {
    params: {
      ruta: ruta,
      nombre: nombre
    }
  });
}

export function getInfoFolder(slug) {
  return axios.post(url_backend+"carpeta/GetInfoFolder", {
    params: {
      'slug': slug
    }
  })
}
