import {Injectable} from '@angular/core';

@Injectable ( {
                  providedIn: 'root'
              } )
export class CookieManagerService {

    constructor () {
    }

    getCookie ( name: string ) {
        const ca: Array<string> = document.cookie.split ( ';' );
        const caLen: number = ca.length;
        const cookieName = `${name}=`;
        let c: string;

        for ( let i = 0; i < caLen; i += 1 ) {
            c = ca[ i ].replace ( /^\s+/g , '' );
            if ( c.indexOf ( cookieName ) === 0 ) {
                return c.substring ( cookieName.length , c.length );
            }
        }
        return '';
    }

    deleteCookie ( name ) {
        this.setCookie ( name , '' , - 1 );
    }

    setCookie ( name: string , value: string , expireDays: number , path: string = '' ) {
        const d: Date = new Date ();
        d.setTime ( d.getTime () + expireDays * 24 * 60 * 60 * 1000 );
        const expires = `expires=${d.toUTCString ()}`;
        const cpath: string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }
}
