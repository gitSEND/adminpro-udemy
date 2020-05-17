import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
	subcription: Subscription;
	constructor() {
		this.subcription = this.regresaObservable().subscribe(
			(numero) => console.log('subs', numero),
			(error) => console.log('Error en el Obs', error),
			() => console.log('El observador termino!')
		);
	}

	ngOnInit(): void { }

	ngOnDestroy(): void {
		this.subcription.unsubscribe();
	}

	regresaObservable(): Observable<any> {
		return new Observable((observer: Subscriber<any>) => {
			let contador = 0;
			const intervalo = setInterval(() => {
				contador++;
				const salida = {
					valor: contador,
				};
				observer.next(salida);
				// if (contador === 3) {
				//   clearInterval(intervalo);
				//   observer.complete();
				// }
				// if (contador === 2) {
				//  clearInterval(intervalo);
				//   observer.error('Ops');
				// }
			}, 1000);
		}).pipe(
			map((resp) => resp.valor),
			filter((valor, index) => {
				if (valor % 2 === 1) {
					return true;
				} else {
					return false;
				}
			})
		);
	}
}
