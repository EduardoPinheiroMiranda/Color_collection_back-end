export class ErroDeValidacao extends Error{
	constructor(){
		super("Erro: dados inseridos invalidos")
	}
}