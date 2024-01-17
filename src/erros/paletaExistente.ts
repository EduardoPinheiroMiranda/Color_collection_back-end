export class PaletaExistente extends Error{
	constructor(){
		super("Erro: este nome já esta em uso.")
	}
}