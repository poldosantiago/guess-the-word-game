/**
 * @description embaralha um array.
 * @param {object[]} array 
 * @returns {object[]}
 * @see <a href="https://pt.stackoverflow.com/questions/94646/como-misturar-um-array-em-javascript">Como misturar um array em JavaScript?</a>
 * @see <a href="https://bost.ocks.org/mike/shuffle/">Fisher–Yates Shuffle</a>
 */
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


/**
 * @description lê um arquivo JSON por meio de uma URL e retona seu conteúdo
 * @param {String} url caminho URL do arquivo JSON
 * @returns {JSON[]} resultado da leitura do JSON 
 */
async function lerJSON(url){
	const promessa = await fetch(url);
	return await promessa.json();
}

export {
    shuffle,
    lerJSON
}