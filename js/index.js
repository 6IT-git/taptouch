
const ALERT_CONTAINER_ID = 'alert-container';
const __store = Store({ id: 0, pseudo: '', speed: 0, pressision: 0, error: 0, when: 0, title:'', exist: 0 });
const __display = Display(__store);

const texts = [
	{ id: 1, title: 'Salut', value: 'Bonjour, salut' },
	{ id: 2, title: 'Fou', value: 'Je suis trop jeune pour mourir le monde est fou' },
	{id: 3, title: 'Psaume 91', value: "Le Seigneur est mon berger : je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles. Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom. Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi ; ta houlette et ton bâton me rassurent. Tu dresses devant moi une table, en face de mes adversaires ; tu oins ma tête, ma coupe déborde. Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Eternel pour toujours."},
	{id: 4, title: 'Psaume 23', value: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant. Je dis à l'Éternel : Mon refuge et ma forteresse, mon Dieu en qui je me confie ! Car c'est lui qui te délivre du filet de l'oiseleur, de la peste et de ses ravages. Il te couvrira de ses plumes, et tu trouveras un refuge sous ses ailes ; sa fidélité est un bouclier et une cuirasse. Tu ne craindras ni les terreurs de la nuit, ni la flèche qui vole de jour, ni la peste qui marche dans les ténèbres, ni la contagion qui frappe en plein midi. Que mille tombent à ton côté, et dix mille à ta droite, tu ne seras pas atteint ; de tes yeux seulement tu regarderas, et tu verras la rétribution des méchants. Car tu es mon refuge, ô Éternel ! Tu fais du Très-Haut ta retraite. Aucun malheur ne t'arrivera, aucun fléau n'approchera de ta tente. Car il ordonnera à ses anges de te garder dans toutes tes voies ; ils te porteront sur les mains, de peur que ton pied ne heurte contre une pierre. Tu marcheras sur le lion et sur l'aspic, tu fouleras le lionceau et le dragon. Puisqu'il m'aime, je le délivrerai ; je le protégerai, puisqu'il connaît mon nom. Il m'invoquera, et je lui répondrai ; je serai avec lui dans la détresse, je le délivrerai et je le glorifierai. Je le rassasierai de longs jours, et je lui ferai voir mon salut."}
];

const index = Math.floor(Math.random() * texts.length);
const text = texts[index];
const words = text.value.split(' ');
const letters = [...text.value];

let start = false;
let end = false;
let counter = 0;

let pt_err = 0;
let pt_speed = 0;
let startTime = 0;
let endTime = 0;

let scrollNum = 1;

// sessionStorage.removeItem("ginov_taptouch@ranks");
const gameGrid = __display.displayText(words);
__display.displayRank();



document.addEventListener('keypress', function (event) {
	//manage start and stop
	if (!start) return 1;
	if (counter == letters.length - 1) {
		start = false;

		endTime = Date.now();
		end = true;

		//at end of game sala ba calcul
		const pressision = Math.round(Math.abs(letters.length - pt_err) * 100 / letters.length);
		const speed = (endTime - startTime) / 1000;

		//store user data
		__store.user.pseudo = 'Player_' + __store.all.length;
		__store.user.speed = speed;
		__store.user.pressision = pressision;
		__store.user.error = pt_err;
		__store.user.title = text.title;

		__store.user.save();

		__display.displayRank(__store.user.id);

		console.log('pressision :' + pressision + '% ' + 'speed :' + speed + 's' + 'errors :' + pt_err);
		Alertx(ALERT_CONTAINER_ID).alert(
			'P :' + pressision + '% ' + 'S :' + speed + 's ' + 'E :' + pt_err,
			'success',
			2000
		);
	}

	//start time counter at first letter
	if(counter == 1)
		startTime = Date.now();

	//don't scroll when Space key press
	if (event.code === 'Space') {
		event.preventDefault();
	}

	if (event.key == letters[counter]) {
		gameGrid[counter].className = 'letter ok';

		//Scroll manager
		const scrollHeight = window.innerHeight * 75 / 100;
		if (document.body.scrollHeight > window.innerHeight && gameGrid[counter].offsetTop > scrollNum * scrollHeight) {
			console.log('scroll');
			window.scrollTo(0, scrollNum * scrollHeight - 10 * scrollHeight / 100);
			scrollNum++;
		}

		counter++;

		//focus on next letter
		if (counter < gameGrid.length - 1)
			gameGrid[counter].className = 'letter on';

		return 0;
	}

	gameGrid[counter].className = 'letter not_ok';
	pt_err++;
	return 3;
});

document.querySelector('#start').addEventListener('click', function (event) {
	this.blur();
	document.activeElement.blur();
	document.body.focus();
	// document.getElementById('game').focus();

	if (end)
		window.location.href = window.location.href;

	if (start)
		window.location.href = window.location.href;

	start = true;
	gameGrid[0].className = 'letter on'
});