import Parse from '../../node_modules/parse/dist/parse';


// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'kkWwjLM6jwGw4cW1VeN7NoLuuAWWCcQOT3nwfcZD';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'F41sCleZ0JFerYg6Kjg4zHU94Fk0hmGAu3yI6VW7';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export const parseFile = {
	uploadFile (file) {
		return new Parse.File('img', file).save()
	}
}