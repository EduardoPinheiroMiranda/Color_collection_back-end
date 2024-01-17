export class EmailExistente extends Error{
	constructor(){
		super("Erro: este email já esta em uso.")
	}
}