export class Globals{

    setRol(rol) {
        localStorage.setItem('rol', rol);
      }

      getRol(): any {
        return localStorage.getItem('rol');
      }

      setUid(uid) {
        localStorage.setItem('uid', uid);
      }

      getUid(): any {
        return localStorage.getItem('uid');
      }
}