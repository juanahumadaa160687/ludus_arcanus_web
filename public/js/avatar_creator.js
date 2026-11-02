
/*
* Se utiliza la librería DiceBear, de código abierto, enfocada en la privacidad del usuario.
* El objetivo es que cada usuario tenga un avatar, pero de forma automática y random.
* Para generar el avatar es necesario crear un seed, el que puede ser un nombre de usuario, un email, o cualquier otro datos distintivo del usuario.
* El avatar generado es único para el usuario y tiene animaciones.
* */
export function createAvatar() {

    //Se crea el seed, un número random que estará asociado al usuario para evitar el uso de su información.
    const seed = Math.random().toString(36).substring(2, 15);

    //La función devuelve la url de la API del avatar generado, el cual se guardará junto con los demás datos en el registro de usuario.
    return `https://api.dicebear.com/10.x/pixelbot/svg?tags=animation&seed=${seed}`;

}