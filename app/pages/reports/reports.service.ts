import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class ReportsService {

//	private url = environment.apiBaseUrl + 'Reports';

	constructor(private http: HttpClient) { }

	print(div: { innerHTML: string; }) {
		const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
		const printAndClose = '<script>onload = function() { window.print(); window.close(); }</script>';
		const styles = document.getElementsByTagName('style');

		let styleText = '';

		for (let i = 0; i < styles.length; i++) {
			const style = styles[i];
			styleText += style.innerHTML;
		}

		WindowPrt.document.write(`
      <!doctype html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>
                نظام إدارة المدارس
          </title>

          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <!-- #CSS Links -->
          <!-- Basic Styles -->
          <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

          <link rel="stylesheet" type="text/css" href="assets/css/smartadmin-production.min.css">
          <link rel="stylesheet" type="text/css" href="assets/css/smartadmin-skins.min.css">

          <!-- SmartAdmin RTL Support (Not using RTL? Disable the CSS below to save bandwidth) -->
          <link rel="stylesheet" type="text/css" href="assets/css/smartadmin-rtl.min.css">

          <!-- SmartAdmin Angular 2. Flex Layout  -->
          <link rel="stylesheet" type="text/css" href="assets/css/smartadmin-angular-next.css">

          <!-- #FAVICONS -->
          <link rel="shortcut icon" href="assets/img/favicon/favicon.ico" type="image/x-icon">

          <link rel="stylesheet" type="text/css" href="assets/css/theme.css" />
          <link href="assets/css/material-icons.css" rel="stylesheet">
          <link rel="stylesheet" href="assets/css/all.min.css">
          <link rel="stylesheet" type="text/css" href="/assets/css/print.css">
          <style>
            ${styleText}
          </style>
      </head>
      <body dir="rtl" class="smart-rtl smart-style-2">
    `);
		WindowPrt.document.write(div.innerHTML);

		WindowPrt.document.write(`
        ${printAndClose}
        </body>
      </html>
    `);

		WindowPrt.document.close();
	}
}
